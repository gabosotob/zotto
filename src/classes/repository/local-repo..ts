/* eslint-disable @typescript-eslint/no-explicit-any */
import Repo from '../../decorators/repo.decorator';
import { Entity } from '../../interfaces/entity.interface';
import { IRepo } from '../../interfaces/repo.interface';
import { Id } from '../../types/id.type';

/**
 * LocalRepo
 * Serves as a local repository for entities. This is useful for testing and development.
 */
@Repo()
export default class LocalRepo<T extends Entity> implements IRepo<T> {
    private entities: Record<Id, T> = {} as Record<Id, T>;

    async create(entity: T): Promise<T> {
        const id = Math.floor(Math.random() * 100000000);
        const entityCopy = { ...entity, id };
        this.entities[id] = entityCopy;
        return entityCopy;
    }

    async read(id: Id): Promise<T> {
        return this.entities[id];
    }

    async readAll(): Promise<T[]> {
        return Object.values(this.entities);
    }

    async update(id: Id, entity: T): Promise<T> {
        this.entities[id] = entity;
        return entity;
    }

    async delete(id: Id): Promise<void> {
        delete this.entities[id];
    }
}
