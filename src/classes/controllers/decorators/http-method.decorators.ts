import { HttpStatusEnum } from '../../../enums/http-status.enum';
import { ControllerMethodDecoratorFactory } from './controller-method-decorator.factory';

export function Get() {
    return ControllerMethodDecoratorFactory.create(HttpStatusEnum.OK);
}

export function Post() {
    return ControllerMethodDecoratorFactory.create(HttpStatusEnum.CREATED);
}

export function Put() {
    return ControllerMethodDecoratorFactory.create(HttpStatusEnum.OK);
}

export function Patch() {
    return ControllerMethodDecoratorFactory.create(HttpStatusEnum.OK);
}

export function Delete() {
    return ControllerMethodDecoratorFactory.create(HttpStatusEnum.NO_CONTENT);
}
