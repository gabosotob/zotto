import { Id } from '../../types/id.type';
import { Service } from './service.abstract';

export abstract class CrudService<T> extends Service<T> {
    abstract getById(id: Id): Promise<T>;
    abstract getAll(): Promise<T[]>;
    abstract save(payload: Omit<T, 'id'>): Promise<T>;
    abstract update(id: Id, payload: Omit<T, 'id'>): Promise<T>;
    abstract remove(id: Id): Promise<void>;
}
