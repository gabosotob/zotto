import { Router } from 'express';

export type Routable<T = object> = T & { getRouter: () => Router };
