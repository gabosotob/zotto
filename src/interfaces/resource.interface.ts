import { Router } from 'express';

import { Controller } from './controller.interface';
import { Service } from './service.interface';
import { Validator } from './validator.interface';

export interface Resource<T> {
    name: string;
    router: Router;
    controller: Controller<T>;
    service: Service<T>;
    externalServices: Controller<unknown>['externalServices'];
    validator: Validator;
    getRouter(): Router;
}
