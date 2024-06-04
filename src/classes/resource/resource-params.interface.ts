import { ErrorRequestHandler, Router } from 'express';

import { Entity } from '../../interfaces/entity.interface';
import { Repo } from '../repository/repository.abstract';

export interface ResourceParams<T extends Entity> {
    router?: Router;
    // FIXME: Zervice is not defined
    service?: unknown;
    repo?: Repo<T>;
    errorHandler?: ErrorRequestHandler;
}
