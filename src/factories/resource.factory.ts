import { Router } from 'express';

import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { PARAMTYPES_METADATA } from '../constants/reflect-metadata.constants';
import {
    BASE_PATH_SYMBOL,
    DEPENDENCIES_SYMBOL,
    ROUTE_PATH_INFO_SYMBOL,
    Z_RESOURCE_SYMBOL,
    Z_SERVICE_SYMBOL,
} from '../constants/symbols.constants';
import { ClassType } from '../types/class.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { Optional } from '../types/optional.type';
import { RoutePathInfo } from '../types/route-path-info.type';
import { toAbsolutePath } from '../utils/path.utils';
import { isFunction } from '../utils/type-guards.utils';
import { ServiceFactory } from './service.factory';

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
        if (!isResource) throw new ZottoError('Resource class must be decorated with @Resource');

        // Resolve the resource dependency services
        const dependencies = Reflect.getMetadata(DEPENDENCIES_SYMBOL, ResourceClass) || {};
        const paramtypes = Reflect.getMetadata(PARAMTYPES_METADATA, ResourceClass) || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resourceArgs = paramtypes.map((param: any, index: number) => {
            const dependency = dependencies[index];

            let service: unknown;

            const { name } = param.name ? param : Object.getPrototypeOf(param);

            if (dependency && name === dependency.className) {
                const isService = Reflect.getMetadata(Z_SERVICE_SYMBOL, dependency.class);

                if (!isService) throw new ZottoError(`Dependency service must be decorated with @Service`);

                service = ServiceFactory.create(dependency.class);

                if (!service) throw new ZottoError(`Failed to create dependency service ${dependency.className}`);
            }

            return service || args.shift();
        });

        // Create an instance of the resource class
        const resource: T | undefined = ResourceClass.createInstance?.(resourceArgs);
        if (!resource) throw new ZottoError('Failed to create resource instance');

        // Get the base path and the paths info from the metadata that was set by the Resource decorator
        const basePath = Reflect.getMetadata(BASE_PATH_SYMBOL, ResourceClass);
        if (!basePath) throw new ZottoError('Resource class must have a base path');

        // Get the paths info from the metadata that was set by the Controller decorators (Get, Post, Put, Delete, etc.)
        const pathsInfo: RoutePathInfo[] = Reflect.getMetadata(ROUTE_PATH_INFO_SYMBOL, ResourceClass);
        if (!pathsInfo?.length) throw new ZottoError('Resource class must have at least one path');

        const router = Router();

        // Register all paths in the router
        for (const { path, method, handlerName } of pathsInfo) {
            const absolutePath = toAbsolutePath(basePath, path);
            const requestHandler = resource[handlerName as keyof T];

            if (!isFunction(requestHandler)) throw new ZottoError(`Handler ${handlerName} is not a function`);

            router[method](absolutePath, requestHandler);
        }

        return Object.assign(resource, { getRouter: () => router });
    }
}
