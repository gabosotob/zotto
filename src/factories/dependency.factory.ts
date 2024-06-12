/* eslint-disable import/no-cycle */
import { ZottoError } from '../classes/exceptions/zotto-error.exception';
import { ClassType } from '../types';
import MetadataUtils from '../utils/metadata.utils';
import { isClassType } from '../utils/type-guards.utils';
import RepoFactory from './repo.factory';
import ServiceFactory from './service.factory';

export default class DependencyResolver {
    static getDependencies(target: ClassType) {
        const dependencies = MetadataUtils.getDependencies(target) || {};
        const paramtypes = MetadataUtils.getParamtypes(target) || [];

        return paramtypes.map((param: unknown, index: number) => {
            if (!isClassType(param)) throw new ZottoError('Dependency must be a class');

            const dependency = dependencies[index];

            if (!dependency || param.name !== dependency.className)
                throw new ZottoError(`Dependency ${param.name} not found`);

            if (!MetadataUtils.isInjectable(dependency.class))
                throw new ZottoError(
                    `Dependency must be decorated with either @Service, @Repo, @Driver, or @Injectable`,
                );

            return this.resolveInstance(dependency.class);
        });
    }

    private static resolveInstance<T>(Class: ClassType<T>): T {
        if (MetadataUtils.isZService(Class)) return ServiceFactory.create(Class);
        if (MetadataUtils.isZRepo(Class)) return RepoFactory.getInstance(Class);

        return new Class();
    }
}
