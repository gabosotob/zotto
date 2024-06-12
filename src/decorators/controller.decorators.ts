import { ControllerMethod } from '../enums';
import ControllerDecoratorFactory from './controller-decorator.factory';

export const Get = (path?: string) => ControllerDecoratorFactory.create({ method: ControllerMethod.GET, path });
export const Post = (path?: string) => ControllerDecoratorFactory.create({ method: ControllerMethod.POST, path });
export const Put = (path?: string) => ControllerDecoratorFactory.create({ method: ControllerMethod.PUT, path });
export const Patch = (path?: string) => ControllerDecoratorFactory.create({ method: ControllerMethod.PATCH, path });
export const Delete = (path?: string) => ControllerDecoratorFactory.create({ method: ControllerMethod.DELETE, path });
