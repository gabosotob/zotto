import { Router } from 'express';

import { BASE_PATH_SYMBOL, ROUTE_PATH_INFO_SYMBOL, Z_RESOURCE_SYMBOL } from '../constants/symbols.constants';
import { ClassType } from '../types/class.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { Optional } from '../types/optional.type';
import { RoutePathInfo } from '../types/route-path-info.type';
import { toAbsolutePath } from '../utils/path.utils';
import { isFunction } from '../utils/type-guards.utils';

type Routable<T> = T & { getRouter: () => Router };

/**
 * Factory for creating resources, which are classes decorated with "@Resource",
 */
export class ResourceFactory {
    static create<T>(
        ResourceClass: Optional<FactoryInstantiable<T>, 'createInstance'>,
        ...args: ConstructorParameters<ClassType<T>>
    ): Routable<T> {
        // Get the metadata that indicates that the class is a resource
        const isResource = Reflect.getMetadata(Z_RESOURCE_SYMBOL, ResourceClass);

        if (!isResource) {
            throw new Error('Resource class must be decorated with @Resource');
        }

        const resource: T | undefined = ResourceClass.createInstance?.(...args);

        if (!resource) {
            throw new Error('Failed to create resource instance');
        }

        const router = Router();

        // Get the base path and the paths info from the metadata that was set by the Resource decorator
        const basePath = Reflect.getMetadata(BASE_PATH_SYMBOL, ResourceClass);

        if (!basePath) {
            throw new Error('Resource class must have a base path');
        }

        // Get the paths info from the metadata that was set by the Controller decorators (Get, Post, Put, Delete, etc.)
        const pathsInfo: RoutePathInfo[] = Reflect.getMetadata(ROUTE_PATH_INFO_SYMBOL, ResourceClass);

        if (!pathsInfo?.length) {
            throw new Error('Resource class must have at least one path');
        }

        // Register all paths in the router
        for (const { path, method, handlerName } of pathsInfo) {
            const absolutePath = toAbsolutePath(basePath, path);
            console.log('🚀 ~ ResourceFactory ~ absolutePath:', absolutePath);

            const requestHandler = resource[handlerName as keyof T];

            if (!isFunction(requestHandler)) {
                throw new Error(`Handler ${handlerName} is not a function`);
            }

            router[method](absolutePath, requestHandler);
        }

        return Object.assign(resource, { getRouter: () => router });
    }
}
