import { Id } from '../types/id.type';
import { Service } from './service.interface';

export interface CrudService<T> extends Service<T> {
    getById(id: Id): Promise<T>;
    getAll(): Promise<T[]>;
    save(payload: Omit<T, 'id'>): Promise<T>;
    update(id: Id, payload: Omit<T, 'id'>): Promise<T>;
    remove(id: Id): Promise<void>;
}
