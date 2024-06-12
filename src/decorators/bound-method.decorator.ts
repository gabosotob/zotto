import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { Func } from '../types';

export default function BoundMethod() {
    return <T extends Func>(_target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        if (typeof descriptor.value !== 'function')
            throw new ZottoError(
                `@boundMethod decorator can only be applied to methods not: ${typeof descriptor.value}`,
            );

        return {
            configurable: true,
            get(this: T): T {
                const bound = descriptor.value.bind(this);
                Object.defineProperty(this, propertyKey, {
                    value: bound,
                    configurable: true,
                    writable: true,
                });
                return bound;
            },
        };
    };
}
