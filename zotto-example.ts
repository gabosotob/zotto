import { Request } from 'express';

import { NotFoundException } from './dist';
import { Delete, Get, Post, Put } from './src';
import { Resource } from './src/decorators/resource.decorator';
import { ResourceFactory } from './src/factories/resource.factory';
import { Id } from './src/types/id.type';
import MockCrudService from './tests/mocks/service.mock';

const service = new MockCrudService();

@Resource('zottos')
export class ZottoResource {
    constructor() {}
    @Get()
    getAll() {
        return service.read();
    }

    @Get(':id')
    async getById({ params }: Request<{ id: Id }>) {
        const data = await service.readById(params.id);

        if (!data) {
            throw new NotFoundException('Not found');
        }
    }

    @Post()
    post(req: Request) {
        return service.create(req.body);
    }

    @Put(':id')
    async put({ params, body }: Request<{ id: Id }>) {
        const idData = await service.readById(params.id);

        if (!idData) {
            throw new NotFoundException('Not found');
        }

        return service.update(body);
    }

    @Delete(':id')
    async delete({ params }: Request<{ id: Id }>) {
        const idData = await service.readById(params.id);

        if (!idData) {
            throw new NotFoundException('Not found');
        }

        await service.delete(params.id);

        return 'Deleted successfully';
    }
}

const zottoResource = ResourceFactory.create(ZottoResource);

export { zottoResource };
