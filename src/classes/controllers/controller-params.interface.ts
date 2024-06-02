import { ExternalServices } from '../services/external-services.type';
import { Service } from '../services/service.abstract';

export interface ControllerParams<T> {
    service: Service<T>;
    externalServices?: ExternalServices;
}
