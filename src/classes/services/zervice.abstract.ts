import { Id } from '../../types/id.type';
import { NotFoundException } from '../exceptions';
import { Repository } from '../repository/repository.abstract';
import { CrudService } from './crud-service.abstract';

export abstract class Zervice<T> extends CrudService<T> {
    constructor(name: string, repository: Repository<T>) {
        super(name, repository);
    }

    async getById(id: Id) {
        const resource = await this.repository.readById(id);

        if (!resource) throw new NotFoundException('Resource not found');

        return resource;
    }

    getAll() {
        return this.repository.readAll();
    }

    async save(payload: Omit<T, 'id'>) {
        return this.repository.create(payload);
    }

    async update(id: Id, payload: Omit<T, 'id'>) {
        const resource = await this.getById(id);

        return this.repository.update(id, {
            ...resource,
            ...payload,
        });
    }

    async remove(id: Id): Promise<void> {
        const resource = await this.getById(id);

        return this.repository.delete(resource);
    }
}
