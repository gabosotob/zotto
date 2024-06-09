import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { BASE_PATH_SYMBOL, Z_RESOURCE_SYMBOL } from '../constants/symbols.constants';
import { ClassType } from '../types/class.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { toPath } from '../utils/path.utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Creates a resource decorator that sets the base path for a class.
 *
 * @param name The name of the resource that is used as the base path, e.g. '/users' or '/posts', or just a name, e.g. 'users' or 'posts' (will be converted to '/users' and '/posts' respectively).
 * @returns A decorator function that sets the base path metadata for the class.
 */
export function Resource(name: string) {
    return function <T extends ClassType>(Class: T): FactoryInstantiable {
        // Sets the base path metadata for the class. This metadata is used by the ResourceFactory to create the router for the resource.
        Reflect.defineMetadata(BASE_PATH_SYMBOL, toPath(name), Class);

        // Sets the Z_RESOURCE_SYMBOL metadata for the class. This metadata is used by the ResourceFactory to check if the class is a resource.
        Reflect.defineMetadata(Z_RESOURCE_SYMBOL, true, Class);

        /**
         * It returns a new class that extends the original class and adds a static method createInstance that is used by the ResourceFactory to create an instance of the resource.
         * The constructor of the new class checks if the instance is created with the createInstance method and throws an error if it is not, to prevent the direct instantiation of the resource.
         */
        return class extends Class {
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
