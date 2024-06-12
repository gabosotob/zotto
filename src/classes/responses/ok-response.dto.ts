export default class OkResponseDto {
    public message?: string;

    public data?: unknown;

    constructor(
        public ok: boolean,
        { message, data }: { message?: string; data?: unknown } = {},
    ) {
        if (message) {
            this.message = message;
        } else {
            this.data = data;
        }
    }
}
