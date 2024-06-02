import { Nameable } from '../../interfaces/nameable.interface';
import { Service } from '../services/service.abstract';
import { ControllerParams } from './controller-params.interface';

export abstract class Controller<T> implements Nameable {
    protected readonly service: Service<T>;

    constructor(
        readonly name: string,
        params: ControllerParams<T>,
    ) {
        this.service = params.service;
    }
}
