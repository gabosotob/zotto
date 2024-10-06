/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassType } from '../types';
import { Func } from '../types/function.type';
import { Routable } from '../types/routable.type';

export const isFunction = (value: unknown): value is Func => typeof value === 'function';

export const isClassType = (value: unknown): value is ClassType => !!value?.toString?.().includes('class');

export const isRoutable = (value: unknown): value is Routable =>
    !!value && typeof value === 'object' && !!Object.getOwnPropertyDescriptor(value, 'getRouter');
