import { HttpStatus } from '../../enums/http-status.enum';
import { HttpException } from './http-exception';

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
