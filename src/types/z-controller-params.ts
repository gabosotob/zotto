import { ControllerParams, CrudService } from '../interfaces';

export type ZControllerParams<T> = Omit<ControllerParams<T>, 'name'> & {
    service: CrudService<T>;
};
