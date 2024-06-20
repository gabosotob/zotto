import { Router } from '../libs/express.lib';

export type Routable<T = object> = T & { getRouter: () => Router };
