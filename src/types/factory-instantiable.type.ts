import { ClassType } from './class.type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FactoryInstantiable<T = any> = ClassType<T> & { createInstance: (...args: any[]) => T };
