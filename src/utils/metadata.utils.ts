import { PARAMTYPES_METADATA } from '../constants/reflect-metadata.constants';
import {
    BASE_PATH_SYMBOL,
    DEPENDENCIES_SYMBOL,
    INJECTABLE_SYMBOL,
    ROUTER_PATHS_INFO_SYMBOL,
    Z_REPO_SYMBOL,
    Z_RESOURCE_SYMBOL,
    Z_SERVICE_SYMBOL,
} from '../constants/symbols.constants';
import { ClassType } from '../types';
import { Dependencies } from '../types/dependencies.type';
import { RouterPathInfo } from '../types/route-path-info.type';

type UndefinedOr<T> = T | undefined;

export default class MetadataUtils {
    static readonly getBasePath = (target: ClassType): UndefinedOr<string> =>
        Reflect.getMetadata(BASE_PATH_SYMBOL, target);

    static readonly setBasePath = (target: ClassType, basePath: string) =>
        Reflect.defineMetadata(BASE_PATH_SYMBOL, basePath, target);

    static readonly getDependencies = (target: ClassType): UndefinedOr<Dependencies> =>
        Reflect.getMetadata(DEPENDENCIES_SYMBOL, target);

    static readonly setDependencies = (Target: ClassType) => {
        const paramtypes = this.getParamtypes(Target) || [];

        const dependencies = paramtypes.reduce((deps: Dependencies, param, index) => {
            const newDeps = { ...deps };

            if (MetadataUtils.isInjectable(param)) {
                newDeps[index] = {
                    class: param,
                    className: param.name,
                };
            }

            return newDeps;
        }, {});

        Reflect.defineMetadata(DEPENDENCIES_SYMBOL, dependencies, Target);
    };

    static readonly getRouterPathsInfo = (target: ClassType): UndefinedOr<RouterPathInfo[]> =>
        Reflect.getMetadata(ROUTER_PATHS_INFO_SYMBOL, target);

    static readonly setRouterPathsInfo = (target: ClassType, routerPathsInfo: RouterPathInfo[]) =>
        Reflect.defineMetadata(ROUTER_PATHS_INFO_SYMBOL, routerPathsInfo, target);

    static addRouterPathInfo(target: ClassType, routePathInfo: RouterPathInfo) {
        const routes: RouterPathInfo[] = this.getRouterPathsInfo(target) || [];
        routes.push(routePathInfo);

        this.setRouterPathsInfo(target, routes);
    }

    static readonly isZResource = (target: ClassType): UndefinedOr<boolean> =>
        Reflect.getMetadata(Z_RESOURCE_SYMBOL, target);

    static readonly setAsZResource = (target: ClassType) => {
        this.setDependencies(target);
        Reflect.defineMetadata(Z_RESOURCE_SYMBOL, true, target);
    };

    static readonly isZService = (target: ClassType): UndefinedOr<boolean> =>
        Reflect.getMetadata(Z_SERVICE_SYMBOL, target);

    static readonly setAsZService = (target: ClassType) => {
        this.setDependencies(target);
        Reflect.defineMetadata(Z_SERVICE_SYMBOL, true, target);
    };

    static readonly isInjectable = (target: ClassType): UndefinedOr<boolean> =>
        Reflect.getMetadata(INJECTABLE_SYMBOL, target);

    static readonly setAsInjectable = (target: ClassType) => Reflect.defineMetadata(INJECTABLE_SYMBOL, true, target);

    static readonly getParamtypes = (target: ClassType): UndefinedOr<any[]> =>
        Reflect.getMetadata(PARAMTYPES_METADATA, target);

    static readonly isZRepo = (target: ClassType): UndefinedOr<boolean> => Reflect.getMetadata(Z_REPO_SYMBOL, target);

    static readonly setAsZRepo = (target: ClassType) => {
        this.setDependencies(target);
        Reflect.defineMetadata(Z_REPO_SYMBOL, true, target);
    };
}
