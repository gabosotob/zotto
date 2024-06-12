import { ControllerMethod } from '../enums/http.enums';

export type RouterPathInfo = {
    path: string;
    method: ControllerMethod;
    handlerName: string;
};
