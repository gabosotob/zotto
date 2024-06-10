import { Request } from 'express';

import { Delete, Get, Post, Put, Resource } from '../src/decorators';
import { ResourceFactory } from '../src/factories/resource.factory';
import { Id } from '../src/types/id.type';
import MockCrudService from './mocks/service.mock';

const service = new MockCrudService();

@Resource('zottos')
export class ZottoResource {
    @Get()
    getAll() {
        return service.read();
    }

    @Get(':id')
    async getById({ params }: Request<{ id: Id }>) {
        return service.readById(params.id);
    }

    @Post()
    post(req: Request) {
        return service.create(req.body);
    }

    @Put(':id')
    async put({ params, body }: Request<{ id: Id }>) {
        return service.update(params.id, body);
    }

    @Delete(':id')
    async delete({ params }: Request<{ id: Id }>) {
        await service.delete(params.id);

        return 'Deleted successfully';
    }
}

const zottoResource = ResourceFactory.create(ZottoResource);

export { zottoResource };
