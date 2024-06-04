/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { BASE_PATH_SYMBOL, Z_RESOURCE_SYMBOL } from '../constants/symbols.constants';
import { Constructor } from '../types/constructor.type';
import { toPath } from '../utils/path.utils';

export function Resource(name: string) {
    return function <T extends Constructor<object>>(constructor: T) {
        Reflect.defineMetadata(BASE_PATH_SYMBOL, toPath(name), constructor);
        Reflect.defineMetadata(Z_RESOURCE_SYMBOL, true, constructor);

        return class extends constructor {
            constructor(...args: any[]) {
                const { factoryConstruct } = args.shift() || {};

                if (!new.target || !factoryConstruct) {
                    throw new ZottoError('Resource must be constructed with ResourceFactory.create');
                }

                super(...args);
            }

            static createInstance(...args: any[]) {
                return new this({ factoryConstruct: true }, ...args);
            }
        };
    };
}
