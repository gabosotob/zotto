import { HttpMethod } from '../enums/http.enums';

export type RoutePathInfo = {
    path: string;
    method: HttpMethod;
    handlerName: string;
};
