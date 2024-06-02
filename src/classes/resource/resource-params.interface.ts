import { ErrorRequestHandler, Router } from 'express';

import { Validator } from '../../interfaces/validator.interface';
import { Controller } from '../controllers/controller.abstract';
import { ExternalServices } from '../services/external-services.type';
import { Service } from '../services/service.abstract';

export interface ResourceParams<T> {
    router: Router;
    controller: Controller<T>;
    service: Service<T>;
    externalServices: ExternalServices;
    validator?: Validator;
    errorHandler?: ErrorRequestHandler;
}
