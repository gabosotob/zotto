import { CrudService } from '../services/crud-service.abstract';
import { ControllerParams } from './controller-params.interface';

export type ZControllerParams<T> = Omit<ControllerParams<T>, 'name'> & {
    service: CrudService<T>;
};
