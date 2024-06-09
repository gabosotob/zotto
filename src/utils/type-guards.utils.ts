import { Func } from '../types/function.type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isFunction = (handler: any): handler is Func => typeof handler === 'function';
