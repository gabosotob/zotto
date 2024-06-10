export enum HttpStatusEnum {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum ControllerMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    USE = 'use',
}

export const STATUS_BY_METHOD = {
    [ControllerMethod.GET]: HttpStatusEnum.OK,
    [ControllerMethod.POST]: HttpStatusEnum.CREATED,
    [ControllerMethod.PUT]: HttpStatusEnum.OK,
    [ControllerMethod.PATCH]: HttpStatusEnum.OK,
    [ControllerMethod.DELETE]: HttpStatusEnum.NO_CONTENT,
};
