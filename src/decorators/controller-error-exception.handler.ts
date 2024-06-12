import { Response } from 'express';

import HttpException from '../classes/exceptions/http-exception';
import { HttpStatusEnum } from '../enums/http.enums';
import OkResponseFactory from '../factories/ok-response.factory';

export default function controllerErrorExceptionHandler(error: unknown, res: Response) {
    if (error instanceof HttpException) {
        return res.status(error.statusCode).json(OkResponseFactory.create({ error: error.message }));
    }

    return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Internal server error',
    });
}
