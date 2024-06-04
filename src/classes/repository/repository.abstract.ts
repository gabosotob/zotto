import { Entity } from '../../interfaces/entity.interface';
import { IRepo } from '../../interfaces/repo.interface';
import { Singleton } from '../../interfaces/singleton.interface';

export interface Repo<T extends Entity> extends IRepo<T>, Singleton {}
