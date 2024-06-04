import { HttpStatusEnum } from '../../enums/http.enums';
import { HttpException } from './http-exception';

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatusEnum.BAD_REQUEST);
    }
}
