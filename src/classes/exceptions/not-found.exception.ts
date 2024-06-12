import { HttpStatusEnum } from '../../enums/http.enums';
import HttpException from './http-exception';

export default class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatusEnum.NOT_FOUND);
    }
}
