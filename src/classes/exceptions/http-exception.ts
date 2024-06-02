import { HttpStatusEnum } from '../../enums/http-status.enum';

export class HttpException extends Error {
    constructor(
        message: string,
        public statusCode: HttpStatusEnum,
    ) {
        super(message);
    }
}
