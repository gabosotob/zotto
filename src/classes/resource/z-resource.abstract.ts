import { CrudController } from '../controllers/crud-controller.abstract';
import { Resource } from './resource.abstract';
import { ZResourceParams } from './z-resource-params.type';

export class ZResource<T> extends Resource<T> {
    protected readonly controller: CrudController<T>;

    constructor(name: string, params: ZResourceParams<T>) {
        super(name, params);

        this.controller = params.controller;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.loadMiddlewares = this.loadMiddlewares.bind(this);
        this.loadErrorHandler = this.loadErrorHandler.bind(this);
    }

    protected loadRoutes(): void {
        this.router.get('/', this.controller.getAll);
        this.router.get('/:id', this.controller.getById);
        this.router.post('/', this.controller.post);
        this.router.put('/:id', this.controller.put);
        this.router.delete('/:id', this.controller.delete);
    }

    protected loadMiddlewares(): void {
        this.router.use((req, res, next) => {
            const method = req.method.toLowerCase();
            this.validator?.[method]?.(req, res, next) ?? next();
        });
    }

    protected loadErrorHandler(): void {
        if (this.errorHandler) this.router.use(this.errorHandler);
    }
}
