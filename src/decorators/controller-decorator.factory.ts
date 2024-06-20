import { ControllerMethod, STATUS_BY_METHOD } from '../enums/http.enums';
import OkResponseFactory from '../factories/ok-response.factory';
import { Response } from '../libs/express.lib';
import { Func } from '../types';
import { RouterPathInfo } from '../types/route-path-info.type';
import MetadataUtils from '../utils/metadata.utils';
import { toPath } from '../utils/path.utils';
import { isClassType } from '../utils/type-guards.utils';
import controllerErrorExceptionHandler from './controller-error-exception.handler';

interface ControllerConfig {
    method: ControllerMethod;
    path?: string;
}

export default class ControllerDecoratorFactory {
    static create(config: ControllerConfig) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
            const originalMethod = descriptor.value;

            const routePathInfo: RouterPathInfo = {
                path: toPath(config.path),
                method: config.method,
                handlerName: propertyKey,
            };

            const { constructor: targetConstructor } = target;

            if (!isClassType(targetConstructor))
                throw new Error('Controller decorator must be applied to a class method');

            MetadataUtils.addRouterPathInfo(targetConstructor, routePathInfo);

            // eslint-disable-next-line no-param-reassign, func-names
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
                        if (!res.statusCode) res.status(STATUS_BY_METHOD[config.method]);
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
