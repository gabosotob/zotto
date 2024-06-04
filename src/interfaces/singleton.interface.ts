export interface Singleton {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getInstance(...params: any[]): Singleton;
}
