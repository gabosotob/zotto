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

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export const HTTP_STATUS_BY_METHOD = {
    [HttpMethod.GET]: HttpStatusEnum.OK,
    [HttpMethod.POST]: HttpStatusEnum.CREATED,
    [HttpMethod.PUT]: HttpStatusEnum.OK,
    [HttpMethod.PATCH]: HttpStatusEnum.OK,
    [HttpMethod.DELETE]: HttpStatusEnum.NO_CONTENT,
};
