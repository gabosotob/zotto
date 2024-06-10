import { Id } from '../types/id.type';
import { Entity } from './entity.interface';

export interface IRepo<T extends Entity> {
    create(entity: Omit<T, 'id'>): Promise<T>;
    read(id: Id): Promise<T>;
    readAll(): Promise<T[]>;
    update(id: Id, entity: T): Promise<T>;
    delete(id: Id): Promise<void>;
}
