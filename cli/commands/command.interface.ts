export interface Command {
    name: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCommand(): (...args: any[]) => Promise<void>;
}
