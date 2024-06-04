import { Constructor } from './constructor.type';

export type FactoryInstantiable<T> = Constructor<T> & { createInstance: (...args: unknown[]) => T };
