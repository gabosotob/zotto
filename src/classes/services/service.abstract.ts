import { Nameable } from '../../interfaces/nameable.interface';
import { Repository } from '../repository/repository.abstract';

export abstract class Service<T = unknown> implements Nameable {
    constructor(
        readonly name: string,
        protected readonly repository: Repository<T>,
    ) {}
}
