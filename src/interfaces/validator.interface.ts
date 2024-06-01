import { Middleware } from '../types';

export type Validator = {
    [key: string]: Middleware;
};
