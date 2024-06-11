/* eslint-disable @typescript-eslint/no-explicit-any */
import { PARAMTYPES_METADATA } from '../constants/reflect-metadata.constants';
import {
    BASE_PATH_SYMBOL,
    DEPENDENCIES_SYMBOL,
    Z_RESOURCE_SYMBOL,
    Z_SERVICE_SYMBOL,
} from '../constants/symbols.constants';
import { ClassType } from '../types/class.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { ServiceInfo } from '../types/service-info.type';
import { toPath } from '../utils/path.utils';
import { FactoryConstructable } from './helpers/factory-constructable.decorator';

/**
 * Creates a resource decorator that sets the base path for a class.
 *
 * @param name The name of the resource that is used as the base path, e.g. '/users' or '/posts', or just a name, e.g. 'users' or 'posts' (will be converted to '/users' and '/posts' respectively).
 * @returns A decorator function that sets the base path metadata for the class.
 */
export function Resource(name: string) {
    return function <T extends ClassType>(Class: T): FactoryInstantiable {
        // Gets the parameter types of the class constructor
        const paramtypes = Reflect.getMetadata(PARAMTYPES_METADATA, Class) || [];

        const dependencies: Record<number, ServiceInfo> = {};

        // Stores the dependencies metadata for the class. This metadata is used by the ResourceFactory to inject the dependencies into the resource.
        paramtypes.forEach((param: any, index: number) => {
            const isService = Reflect.getMetadata(Z_SERVICE_SYMBOL, param);

            // If the parameter is marked as a service, it is stored in the dependencies metadata.
            if (isService) {
                // Gets the prototype of the parameter to get the class name, as the class should be anonymous.
                const proto = Object.getPrototypeOf(param);

                dependencies[index] = {
                    class: param,
                    className: proto.name,
                };
            }
        });

        Reflect.defineMetadata(DEPENDENCIES_SYMBOL, dependencies, Class);

        // Sets the base path metadata for the class. This metadata is used by the ResourceFactory to create the router for the resource.
        Reflect.defineMetadata(BASE_PATH_SYMBOL, toPath(name), Class);

        // Sets the Z_RESOURCE_SYMBOL metadata for the class. This metadata is used by the ResourceFactory to check if the class is a resource.
        Reflect.defineMetadata(Z_RESOURCE_SYMBOL, true, Class);

        /**
         * It returns a new class that extends the original class and adds a static method createInstance that is used by the ResourceFactory to create an instance of the resource.
         * The constructor of the new class checks if the instance is created with the createInstance method and throws an error if it is not, to prevent the direct instantiation of the resource.
         */
        return FactoryConstructable(Class, 'Resource must be constructed with ResourceFactory.create');
    };
}
