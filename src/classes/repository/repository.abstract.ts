import { DatabaseDriver } from '../../interfaces/database-driver.interface';
import { Nameable } from '../../interfaces/nameable.interface';
import { Id } from '../../types/id.type';

export abstract class Repository<T> implements Nameable {
    constructor(
        readonly name: string,
        protected readonly driver: DatabaseDriver,
    ) {}

    abstract readById(id: Id): Promise<T | undefined>;
    abstract readAll(): Promise<T[]>;
    abstract create(payload: Omit<T, 'id'>): Promise<T>;
    abstract update(id: Id, payload: Omit<T, 'id'>): Promise<T>;
    abstract delete(transaction: T): Promise<void>;
}
