import { HttpStatusEnum } from '../../enums/http.enums';

export class HttpException extends Error {
    constructor(
        message: string,
        public statusCode: HttpStatusEnum,
    ) {
        super(message);
    }
}
