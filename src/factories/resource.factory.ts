import { Router } from 'express';

import { BASE_PATH_SYMBOL, ROUTE_PATH_INFO_SYMBOL, Z_RESOURCE_SYMBOL } from '../constants/symbols.constants';
import { Constructor } from '../types/constructor.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { Optional } from '../types/optional.type';
import { RoutePathInfo } from '../types/route-path-info.type';

type Routable<T> = T & { getRouter: () => Router };

export class ResourceFactory {
    static create<T>(
        ResourceClass: Optional<FactoryInstantiable<T>, 'createInstance'>,
        ...args: ConstructorParameters<Constructor<T>>
    ): Routable<T> {
        const isResource = Reflect.getMetadata(Z_RESOURCE_SYMBOL, ResourceClass);

        if (!isResource) {
            throw new Error('Resource class must be decorated with @Resource');
        }

        const resource: T | undefined = ResourceClass.createInstance?.(...args);

        if (!resource) {
            throw new Error('Failed to create resource instance');
        }

        const router = Router();

        const basePath = Reflect.getMetadata(BASE_PATH_SYMBOL, ResourceClass);
        const pathsInfo: RoutePathInfo[] = Reflect.getMetadata(ROUTE_PATH_INFO_SYMBOL, ResourceClass);

        const toAbsolutePath = (basePath: string, relativePath: string) => `${basePath}${relativePath}`;
        for (const { path, method, handlerName } of pathsInfo) {
            const absolutePath = toAbsolutePath(basePath, path);

            const isFunction = (handler: unknown): handler is (...args: unknown[]) => unknown =>
                typeof handler === 'function';

            const requestHandler = resource[handlerName as keyof T];

            if (!isFunction(requestHandler)) {
                throw new Error(`Handler ${handlerName} is not a function`);
            }

            router[method](absolutePath, requestHandler);
        }

        return Object.assign(resource, { getRouter: () => router });
    }
}
