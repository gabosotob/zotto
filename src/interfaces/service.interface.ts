import { Repository } from './repository.interface';

export interface Service<T = unknown> {
    name: string;
    repository?: Repository<T>;
}
