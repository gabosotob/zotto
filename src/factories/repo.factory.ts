/* eslint-disable import/no-cycle */
import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { ClassType } from '../types/class.type';
import MetadataUtils from '../utils/metadata.utils';
import DependencyResolver from './dependency.factory';

/**
 * Factory for creating repositories, which are classes decorated with "@Repo",
 */
export default class RepoFactory {
    private static instances: Map<ClassType, InstanceType<ClassType>> = new Map();

    private static create<T>(RepoClass: ClassType<T>) {
        // Get the metadata that indicates that the class is a resource
        if (!MetadataUtils.isZRepo(RepoClass)) throw new ZottoError('Repository class must be decorated with @Repo');

        const dependencyInstances = DependencyResolver.getDependencies(RepoClass);

        // Create an instance of the resource class
        const repo: T = new RepoClass(...dependencyInstances);

        if (!repo) throw new ZottoError('Failed to create repository instance');

        return repo;
    }

    static getInstance<T>(RepoClass: ClassType<T>): T {
        let instance = this.instances.get(RepoClass);

        if (!instance) {
            instance = this.create(RepoClass);
            this.instances.set(RepoClass, instance);
        }

        return instance;
    }
}
