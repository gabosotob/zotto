import { CrudController } from '../controllers/crud-controller.abstract';
import { ResourceParams } from './resource-params.interface';

export type ZResourceParams<T> = Omit<ResourceParams<T>, 'controller'> & {
    controller: CrudController<T>;
};
