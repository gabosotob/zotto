import { Service } from './service.abstract';

export type ExternalService = Service<unknown>;
export type ExternalServices = Map<ExternalService['name'], ExternalService>;
