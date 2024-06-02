import { Repository } from '../repository/repository.abstract';

export interface ServiceParams<T = unknown> {
    repository: Repository<T>;
}
