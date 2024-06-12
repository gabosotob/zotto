/* eslint-disable import/no-cycle */
import ZottoError from '../classes/exceptions/zotto-error.exception';
import { ClassType } from '../types/class.type';
import MetadataUtils from '../utils/metadata.utils';
import DependencyResolver from './dependency.factory';

/**
 * Factory for creating services, which are classes decorated with "@Service",
 */
export default class ServiceFactory {
    static create<T>(ServiceClass: ClassType<T>) {
        // Get the metadata that indicates that the class is a resource
        if (!MetadataUtils.isZService(ServiceClass))
            throw new ZottoError('Service class must be decorated with @Service');

        const dependencyInstances = DependencyResolver.getDependencies(ServiceClass);

        // Create an instance of the service class
        const service: T = new ServiceClass(...dependencyInstances);

        return service;
    }
}
