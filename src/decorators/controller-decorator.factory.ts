import { Response } from 'express';

import { OkResponseFactory } from '../classes/responses/ok-response.factory';
import { ROUTE_PATH_INFO_SYMBOL } from '../constants/symbols.constants';
import { ControllerMethod, STATUS_BY_METHOD } from '../enums/http.enums';
import { Func } from '../types';
import { RoutePathInfo } from '../types/route-path-info.type';
import { toPath } from '../utils/path.utils';
import { controllerErrorExceptionHandler } from './controller-error-exception.handler';

interface ControllerConfig {
    method: ControllerMethod;
    path?: string;
}

export class ControllerDecoratorFactory {
    static create(config: ControllerConfig) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;

            const routePathInfo: RoutePathInfo = {
                path: toPath(config.path),
                method: config.method,
                handlerName: propertyKey,
            };

            /**
             * Adds the route path info to the controller class metadata.
             */
            const routes: RoutePathInfo[] = Reflect.getMetadata(ROUTE_PATH_INFO_SYMBOL, target.constructor) || [];
            routes.push(routePathInfo);

            Reflect.defineMetadata(ROUTE_PATH_INFO_SYMBOL, routes, target.constructor);

            descriptor.value = async function (...args: unknown[]) {
                const res = args[1] as Response;
                const next = args[2] as Func<void>;

                let responseData;
                try {
                    responseData = await originalMethod.apply(this, args);

                    /**
                     * If the method is a middleware, we call the next function when the method is done.
                     */
                    if (config.method === ControllerMethod.USE) {
                        next();
                    } else {
                        !res.statusCode && res.status(STATUS_BY_METHOD[config.method]);
                        res.json(OkResponseFactory.create({ data: responseData }));
                    }
                } catch (error) {
                    /**
                     * If the method is a middleware, we call the next function with the error when the method is done.
                     */
                    if (config.method === ControllerMethod.USE) {
                        next(error);
                        return;
                    }

                    console.error(`An exception occurred in ${propertyKey}:`, error);
                    controllerErrorExceptionHandler(error, res);
                }
            };

            return descriptor;
        };
    }
}
