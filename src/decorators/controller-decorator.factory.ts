import { Response } from 'express';

import { OkResponseFactory } from '../classes/responses/ok-response.factory';
import { ROUTE_PATH_INFO_SYMBOL } from '../constants/symbols.constants';
import { HTTP_STATUS_BY_METHOD, HttpMethod } from '../enums/http.enums';
import { RoutePathInfo } from '../types/route-path-info.type';
import { toPath } from '../utils/path.utils';
import { controllerErrorExceptionHandler } from './controller-error-exception.handler';

export class ControllerDecoratorFactory {
    static create(method: HttpMethod, path?: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;

            const routePathInfo: RoutePathInfo = {
                path: toPath(path),
                method,
                handlerName: propertyKey,
            };

            const routes: RoutePathInfo[] = Reflect.getMetadata(ROUTE_PATH_INFO_SYMBOL, target.constructor) || [];
            routes.push(routePathInfo);

            Reflect.defineMetadata(ROUTE_PATH_INFO_SYMBOL, routes, target.constructor);

            descriptor.value = async function (...args: unknown[]) {
                const res = args[1] as Response;

                let responseData;
                try {
                    responseData = await originalMethod.apply(this, args);
                } catch (error) {
                    console.error(`An exception occurred in ${propertyKey}:`, error);
                    controllerErrorExceptionHandler(error, res);

                    return;
                }

                !res.statusCode && res.status(HTTP_STATUS_BY_METHOD[method]);

                res.json(OkResponseFactory.create({ data: responseData }));
            };

            return descriptor;
        };
    }
}
