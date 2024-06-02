import { HttpStatusEnum } from '../../enums/http-status.enum';
import { HttpException } from './http-exception';

export class InternalServerError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatusEnum.INTERNAL_SERVER_ERROR);
    }
}
