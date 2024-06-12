import { Entity, Id, LocalRepo, NotFoundException, Service } from '../../src';

@Service()
export default class MockCrudService<T extends Entity> {
    constructor(private repo: LocalRepo<T>) {}

    public create(item: T): Promise<T> {
        return this.repo.create(item);
    }

    public read(): Promise<T[]> {
        return this.repo.readAll();
    }

    public async readById(id: Id): Promise<T> {
        const item = await this.repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return item;
    }

    public async update(id: Id, dto: T): Promise<T> {
        const item = await this.repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return this.repo.update(id, dto);
    }

    public async delete(id: Id): Promise<void> {
        const item = await this.repo.read(id);
        if (!item) throw new NotFoundException('Item not found');

        return this.repo.delete(id);
    }
}
