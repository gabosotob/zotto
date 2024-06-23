import { Delete, Entity, Get, Id, Post, Put, Resource, ResourceFactory } from '../src';
import { Request } from '../src/libs/express.lib';
import MockCrudService from './mocks/service.mock';

@Resource('zottos')
export class ZottoResource {
    constructor(private service: MockCrudService<Entity>) {}

    @Get()
    getAll() {
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
