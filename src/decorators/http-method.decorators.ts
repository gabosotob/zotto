import { HttpStatus } from '../enums/http-status.enum';
import { ControllerMethodDecoratorFactory } from './controller-method-decorator.factory';

export function Get() {
    return ControllerMethodDecoratorFactory.create(HttpStatus.OK);
}

export function Post() {
    return ControllerMethodDecoratorFactory.create(HttpStatus.CREATED);
}

export function Put() {
    return ControllerMethodDecoratorFactory.create(HttpStatus.OK);
}

export function Patch() {
    return ControllerMethodDecoratorFactory.create(HttpStatus.OK);
}

export function Delete() {
    return ControllerMethodDecoratorFactory.create(HttpStatus.NO_CONTENT);
}
