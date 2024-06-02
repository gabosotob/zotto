import { Response } from 'express';

import { HttpStatusEnum } from '../../../enums/http-status.enum';
import { HttpException } from '../../exceptions/http-exception';
import { OkResponseFactory } from '../../responses/ok-response.factory';

export function controllerErrorExceptionHandler(error: unknown, res: Response) {
    if (error instanceof HttpException) {
        return res.status(error.statusCode).json(OkResponseFactory.create({ error: error.message }));
    }

    return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Internal server error',
    });
}
