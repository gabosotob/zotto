import { Request } from 'express';

import { Delete, Get, Post, Put, Resource } from '../src/decorators';
import { ResourceFactory } from '../src/factories/resource.factory';
import { Entity } from '../src/interfaces/entity.interface';
import { Id } from '../src/types/id.type';
import MockCrudService from './mocks/service.mock';

class StubRepo {
    async find() {
        return [];
    }

    async findOne() {
        return {};
    }

    async create() {
        return {};
    }

    async update() {
        return {};
    }

    async delete() {
        return {};
    }
}

@Resource('zottos')
export class ZottoResource {
    constructor(
        private service: MockCrudService<Entity>,
        private repo: StubRepo,
    ) {}

    @Get()
    getAll() {
        this.repo.find();
        return this.service.read();
    }

    @Get(':id')
    async getById({ params }: Request<{ id: Id }>) {
        return this.service.readById(params.id);
    }

    @Post()
    post(req: Request) {
        return this.service.create(req.body);
    }

    @Put(':id')
    async put({ params, body }: Request<{ id: Id }>) {
        return this.service.update(params.id, body);
    }

    @Delete(':id')
    async delete({ params }: Request<{ id: Id }>) {
        await this.service.delete(params.id);

        return 'Deleted successfully';
    }
}

const zottoResource = ResourceFactory.create(ZottoResource);

export { zottoResource };
