import { ErrorRequestHandler, Router } from 'express';

import { Validator } from '../../interfaces';
import { Nameable } from '../../interfaces/nameable.interface';
import { Controller } from '../controllers/controller.abstract';
import { ExternalServices } from '../services/external-services.type';
import { Service } from '../services/service.abstract';
import { ResourceParams } from './resource-params.interface';

export abstract class Resource<T> implements Nameable {
    protected readonly router: Router;
    protected readonly controller: Controller<T>;
    protected readonly service: Service<T>;
    protected readonly externalServices: ExternalServices;
    protected readonly validator?: Validator;
    protected readonly errorHandler?: ErrorRequestHandler;

    constructor(
        readonly name: string,
        params: ResourceParams<T>,
    ) {
        this.router = params.router;
        this.controller = params.controller;
        this.service = params.service;
        this.externalServices = params.externalServices;
        this.validator = params.validator;
        this.errorHandler = params.errorHandler;

        this.getRouter = this.getRouter.bind(this);
        this.loadRoutes = this.loadRoutes.bind(this);
        this.loadMiddlewares = this.loadMiddlewares.bind(this);
        this.loadErrorHandler = this.loadErrorHandler.bind(this);
    }

    getRouter() {
        return this.router;
    }

    protected abstract loadRoutes(): void;
    protected abstract loadMiddlewares(): void;
    protected abstract loadErrorHandler(): void;
}
