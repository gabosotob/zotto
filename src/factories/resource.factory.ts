import { Router } from 'express';

import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { ClassType } from '../types';
import { Routable } from '../types/routable.type';
import { RouterPathInfo } from '../types/route-path-info.type';
import MetadataUtils from '../utils/metadata.utils';
import { toAbsolutePath } from '../utils/path.utils';
import { isFunction, isRoutable } from '../utils/type-guards.utils';
import DependencyResolver from './dependency.factory';

/**
 * Factory for creating resources, which are classes decorated with "@Resource",
 */
export default class ResourceFactory {
    static create<T>(ResourceClass: ClassType): Routable<T> {
        // Get the metadata that indicates that the class is a resource
        if (!MetadataUtils.isZResource(ResourceClass))
            throw new ZottoError('Resource class must be decorated with @Resource');

        // Resolve the resource dependencies and create an instance of the resource class
        const dependencyInstances = DependencyResolver.getDependencies(ResourceClass);
        const resource: T = new ResourceClass(...dependencyInstances);

        // Get the router mapped with the controllers and paths
        const router = this.getRouter(ResourceClass, resource);

        return this.toRoutable(resource, router);
    }

    private static getRouter<T>(ResourceClass: ClassType, resource: T): Router {
        // Get the base path and the paths info from the metadata that was set by the Resource decorator
        const basePath = MetadataUtils.getBasePath(ResourceClass);
        if (!basePath) throw new ZottoError('Resource class must have a base path');

        // Get the paths info from the metadata that was set by the Controller decorators (Get, Post, Put, Delete, etc.)
        const pathsInfo: RouterPathInfo[] = MetadataUtils.getRouterPathsInfo(ResourceClass) || [];
        if (!pathsInfo?.length) throw new ZottoError('Resource class must have at least one path');

        const router = Router();

        // Register all paths in the router
        pathsInfo.forEach(({ path, method, handlerName }) => {
            const requestHandler = resource[handlerName as keyof T];

            if (!isFunction(requestHandler)) throw new ZottoError(`Handler ${handlerName} is not a function`);

            router[method](toAbsolutePath(basePath, path), requestHandler);
        });

        return router;
    }

    private static toRoutable<T>(resource: T, router: Router): Routable<T> {
        Object.defineProperty(resource, 'getRouter', { value: () => router });

        if (!isRoutable(resource)) throw new ZottoError('Unable to make resource routable');

        return resource;
    }
}
