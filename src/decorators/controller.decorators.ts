import { HttpMethod } from '../enums';
import { ControllerDecoratorFactory } from './controller-decorator.factory';

export const Get = (path?: string) => ControllerDecoratorFactory.create(HttpMethod.GET, path);
export const Post = (path?: string) => ControllerDecoratorFactory.create(HttpMethod.POST, path);
export const Put = (path?: string) => ControllerDecoratorFactory.create(HttpMethod.PUT, path);
export const Patch = (path?: string) => ControllerDecoratorFactory.create(HttpMethod.PATCH, path);
export const Delete = (path?: string) => ControllerDecoratorFactory.create(HttpMethod.DELETE, path);
