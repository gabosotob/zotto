import { Id, NotFoundException } from '../../src';
import { LocalRepo } from '../../src/classes/repository/local-repo.';
import { Service } from '../../src/decorators/service.decorator';

const repo = LocalRepo.getInstance();

@Service
export class MockCrudService<T extends { id: string | number }> {
    public create(item: T): Promise<T> {
        return repo.create(item);
    }

    public read(): Promise<T[]> {
        return repo.readAll();
    }

    public async readById(id: Id): Promise<T> {
        const item = await repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return item;
    }

    public async update(id: Id, dto: T): Promise<T> {
        const item = await repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return repo.update(id, dto);
    }

    public async delete(id: Id): Promise<void> {
        const item = await repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return repo.delete(id);
    }
}

export default MockCrudService;
