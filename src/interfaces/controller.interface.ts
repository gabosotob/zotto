import { Service } from './service.interface';

export interface ControllerParams<T> {
    name: string;
    service: Service<T>;
    externalServices: Map<Service<unknown>['name'], Service<unknown>>;
}

export interface Controller<T = unknown> {
    name: string;
    service: Service<T>;
    externalServices: Map<Service<unknown>['name'], Service<unknown>>;
}
