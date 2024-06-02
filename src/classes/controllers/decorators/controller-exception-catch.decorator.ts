/* eslint-disable @typescript-eslint/no-explicit-any */
import { controllerErrorExceptionHandler } from './controller-error-exception.handler';

export function ControllerExceptionCatch() {
    return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const [, res] = args;
            try {
                return originalMethod.apply(this, args);
            } catch (error) {
                console.error(`An exception occurred in ${propertyKey}:`, error);
                controllerErrorExceptionHandler(error, res);
            }
        };

        return descriptor;
    };
}
