import { Id } from '../types/id.type';
import { DatabaseDriver } from './database-driver.interface';

export interface Repository<T> {
    driver: DatabaseDriver;
    readById(id: Id): Promise<T | undefined>;
    readAll(): Promise<T[]>;
    create(payload: Omit<T, 'id'>): Promise<T>;
    update(id: Id, payload: Omit<T, 'id'>): Promise<T>;
    delete(transaction: T): Promise<void>;
}
