import { Request, Response } from 'express';

import { Id } from '../../types/id.type';
import { Controller } from './controller.abstract';

export abstract class CrudController<T> extends Controller<T> {
    abstract getById(req: Request<{ id: Id }>, res: Response): Promise<T>;
    abstract getAll(req: Request, res: Response): Promise<T[]>;
    abstract post(req: Request, res: Response): Promise<T>;
    abstract put(req: Request<{ id: Id }>, res: Response): Promise<T>;
    abstract delete(req: Request<{ id: Id }>, res: Response): Promise<void>;
}
