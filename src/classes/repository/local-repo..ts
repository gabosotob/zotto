import { Entity } from '../../interfaces/entity.interface';
import { IRepo } from '../../interfaces/repo.interface';
import { Singleton } from '../../interfaces/singleton.interface';
import { Id } from '../../types/id.type';

export class LocalRepo<T extends Entity> implements IRepo<T> {
    private static instance: Singleton;
    getInstance(): Singleton {
        if (!LocalRepo.instance) {
            LocalRepo.instance = new LocalRepo();
        }

        return LocalRepo.instance;
    }

    private entities: Record<Id, T> = {} as Record<Id, T>;

    async create(entity: T): Promise<T> {
        const id = Math.floor(Math.random() * 100000000);
        entity.id = id;
        this.entities[id] = entity;
        return entity;
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
