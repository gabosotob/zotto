import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { Z_SERVICE_SYMBOL } from '../constants/symbols.constants';
import { ClassType } from '../types/class.type';
import { FactoryInstantiable } from '../types/factory-instantiable.type';
import { Optional } from '../types/optional.type';

/**
 * Factory for creating services, which are classes decorated with "@Service",
 */
export class ServiceFactory {
    static create<T>(
        ServiceClass: Optional<FactoryInstantiable<T>, 'createInstance'>,
        ...args: ConstructorParameters<ClassType<T>>
    ) {
        // Get the metadata that indicates that the class is a resource
        const isService = Reflect.getMetadata(Z_SERVICE_SYMBOL, ServiceClass);
        if (!isService) throw new ZottoError('Service class must be decorated with @Service');

        // Create an instance of the resource class
        const service: T | undefined = ServiceClass.createInstance?.(...args);

        if (!service) throw new ZottoError('Failed to create service instance');

        return service;
    }
}
