import { Router } from 'express';

import { Validator } from '../../interfaces';
import { Nameable } from '../../interfaces/nameable.interface';
import { Controller } from '../controllers/controller.abstract';
import { ExternalServices } from '../services/external-services.type';
import { Service } from '../services/service.abstract';
import { ResourceParams } from './resource-params.interface';

type MyResourceType = { id: string };

export abstract class Resource implements Nameable {
    readonly name: string;
    protected readonly router: Router;
    protected readonly controller: Controller<MyResourceType>;
    protected readonly service: Service<MyResourceType>;
    protected readonly externalServices: ExternalServices;
    protected readonly validator?: Validator;

    constructor(params: ResourceParams<MyResourceType>) {
        this.name = params.name;
        this.router = params.router;
        this.controller = params.controller;
        this.service = params.service;
        this.externalServices = params.externalServices;
        this.validator = params.validator;
    }

    getRouter() {
        return this.router;
    }
}
