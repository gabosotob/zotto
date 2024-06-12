import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HttpStatus(status: number) {
    return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        // eslint-disable-next-line no-param-reassign, func-names
        descriptor.value = function (...args: any[]) {
            const response: Response = args[1];

            response.status(status);

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
