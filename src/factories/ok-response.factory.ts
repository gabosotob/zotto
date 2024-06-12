import OkResponseDto from '../classes/responses/ok-response.dto';

type OkResponseFactoryPayload = {
    error?: string;
    data?: object | string;
};

export default class OkResponseFactory {
    static create({ error, data }: OkResponseFactoryPayload): OkResponseDto {
        const ok = !error;

        return new OkResponseDto(ok, {
            [ok && typeof data !== 'string' ? 'data' : 'message']: error ?? data,
        });
    }
}
