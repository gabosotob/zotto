import { ControllerMethod } from '../enums/http.enums';

export type RoutePathInfo = {
    path: string;
    method: ControllerMethod;
    handlerName: string;
};
