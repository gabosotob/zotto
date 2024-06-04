import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function HttpStatus(status: number) {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const response: Response = args[1];

            response.status(status);

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
