import { CrudService } from '../interfaces/crud-service.interface';
import { Repository } from '../interfaces/repository.interface';
import { Id } from '../types/id.type';
import { NotFoundException } from './exceptions';

export abstract class Zervice<T> implements CrudService<T> {
    constructor(
        readonly name: string,
        readonly repository: Repository<T>,
    ) {}

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
