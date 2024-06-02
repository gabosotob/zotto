import { Request } from 'express';

import { ZControllerParams } from '../../types';
import { Id } from '../../types/id.type';
import { CrudService } from '../services/crud-service.abstract';
import { CrudController } from './crud-controller.abstract';
import { Delete, Get, Post, Put } from './decorators/http-method.decorators';

export abstract class ZController<T> extends CrudController<T> {
    protected service: CrudService<T>;

    constructor(name: string, params: ZControllerParams<T>) {
        super(name, params);

        this.service = params.service;

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
