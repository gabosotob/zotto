/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZottoError } from '../../classes/exceptions/zotto-error.exception';
import { ClassType } from '../../types';
import { FactoryInstantiable } from '../../types/factory-instantiable.type';

/**
 * FactoryConstructable decorator that creates a new class that extends the target class and adds a static method createInstance that is used by any factory to create an instance of the class.
 * The constructor of the new class checks if the instance is created with the createInstance method and throws an error if it is not, to prevent the direct instantiation of the class.
 *
 * @param target The class to extend.
 * @param errorMessage The error message to throw if the instance is not created with the createInstance method.
 * @returns A new class that extends the target class and adds a static method createInstance.
 */
export function FactoryConstructable(target: ClassType, errorMessage: string): FactoryInstantiable {
    return class extends target {
        constructor(...args: any[]) {
            const { factoryConstruct } = args.shift() || {};

            if (!new.target || !factoryConstruct) {
                throw new ZottoError(errorMessage);
            }

            super(...args);
        }

        // This method is used by any factory to create an instance of the class.
        static createInstance(...args: any[]) {
            return new this({ factoryConstruct: true }, ...args);
        }
    };
}
