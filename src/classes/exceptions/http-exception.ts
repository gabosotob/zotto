import { HttpStatusEnum } from '../../enums/http.enums';
import { ZottoError } from './zotto-error.exception';

export class HttpException extends ZottoError {
    constructor(
        message: string,
        public statusCode: HttpStatusEnum,
    ) {
        super(message);
    }
}
