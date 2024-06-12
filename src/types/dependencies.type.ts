import { ClassType } from './class.type';

export interface Dependency {
    class: ClassType;
    className: string;
}

export type Dependencies = Record<number, Dependency>;
