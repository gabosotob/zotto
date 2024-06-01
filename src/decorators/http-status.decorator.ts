/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import { ZottoError } from '../classes/exceptions/zotto-error.exception';

function HttpStatus(status: number) {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const response: Response = args[1];

            if (response.statusCode) {
                throw new ZottoError(
                    'Cannot use @HttpStatus() if response status is already set.\n' +
                        'Please use @HttpStatus() before setting the response status.\n' +
                        'If you are using multiple decorators, make sure to use @HttpStatus() at the bottom of the decorator list.',
                );
            }

            response.status(status);

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

export default HttpStatus;
