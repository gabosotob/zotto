import { Request, Response } from 'express';

import { Id } from '../types/id.type';
import { Controller } from './controller.interface';

export interface CrudController<T> extends Controller<T> {
    getById(req: Request<{ id: Id }>, res: Response): Promise<T>;
    getAll(req: Request, res: Response): Promise<T[]>;
    post(req: Request, res: Response): Promise<T>;
    put(req: Request<{ id: Id }>, res: Response): Promise<T>;
    delete(req: Request<{ id: Id }>, res: Response): Promise<void>;
}
