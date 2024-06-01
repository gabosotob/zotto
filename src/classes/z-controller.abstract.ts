import { Request } from 'express';

import { Delete, Get, Post, Put } from '../decorators/http-method.decorators';
import { Controller, ControllerParams } from '../interfaces/controller.interface';
import { CrudController } from '../interfaces/crud-controller.interface';
import { CrudService } from '../interfaces/crud-service.interface';
import { Id } from '../types/id.type';

export abstract class ZController<T> implements CrudController<T> {
    readonly name: string;
    readonly service: CrudService<T>;
    readonly externalServices: Controller<unknown>['externalServices'];

    constructor({ name, service, externalServices }: ControllerParams<T> & { service: CrudService<T> }) {
        this.name = name;
        this.service = service;
        this.externalServices = externalServices;

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

    @Get()
    async getAll() {
        return this.service.getAll();
    }

    @Get()
    async getById({ params }: Request<{ id: Id }>) {
        return this.service.getById(params['id']);
    }

    @Post()
    async post(req: Request) {
        return this.service.save(req.body);
    }

    @Put()
    async put({ params, body }: Request<{ id: Id }>) {
        return this.service.update(params['id'], body);
    }

    @Delete()
    async delete({ params }: Request<{ id: Id }>) {
        await this.service.remove(params['id']);
    }
}
