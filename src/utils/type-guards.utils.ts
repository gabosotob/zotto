/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassType } from '../types';
import { Func } from '../types/function.type';
import { Routable } from '../types/routable.type';

export const isFunction = (handler: any): handler is Func => typeof handler === 'function';

export const isClassType = (value: unknown): value is ClassType => !!value?.toString?.().includes('class');

export const isRoutable = (value: unknown): value is Routable =>
    !!value && typeof value == 'object' && value.hasOwnProperty('getRouter');
