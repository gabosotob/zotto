import { Response } from 'express';

import { OkResponseFactory } from '../classes/responses/ok-response.factory';
import { HttpStatus } from '../enums/http-status.enum';
import { controllerErrorExceptionHandler } from './controller-error-exception.handler';

export class ControllerMethodDecoratorFactory {
    static create(status: HttpStatus) {
        return function (_target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;

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

                !res.statusCode && res.status(status);

                res.json(OkResponseFactory.create({ data: responseData }));
            };

            return descriptor;
        };
    }
}
