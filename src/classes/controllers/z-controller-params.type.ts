import { Zervice } from '../services/zervice.abstract';
import { ControllerParams } from './controller-params.interface';

export type ZControllerParams<T> = Omit<ControllerParams<T>, 'name'> & {
    service: Zervice<T>;
};
