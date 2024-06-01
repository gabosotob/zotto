import { DatabaseDriver } from '../interfaces/database-driver.interface';
import { Repository } from '../interfaces/repository.interface';

export abstract class ZRepository<T> implements Repository<T> {
    constructor(readonly driver: DatabaseDriver) {}

    abstract readById(id: string): Promise<T | undefined>;
    abstract readAll(): Promise<T[]>;
    abstract create(payload: Omit<T, 'id'>): Promise<T>;
    abstract update(id: string, payload: Omit<T, 'id'>): Promise<T>;
    abstract delete(transaction: T): Promise<void>;
}
