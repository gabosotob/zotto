export class ZottoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ZottoError';
    }
}
