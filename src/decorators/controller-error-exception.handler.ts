import { Response } from 'express';

import { HttpException } from '../classes/exceptions/http-exception';
import { OkResponseFactory } from '../classes/responses/ok-response.factory';
import { HttpStatus } from '../enums/http-status.enum';

export function controllerErrorExceptionHandler(error: unknown, res: Response) {
    if (error instanceof HttpException) {
        return res.status(error.statusCode).json(OkResponseFactory.create({ error: error.message }));
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Internal server error',
    });
}
