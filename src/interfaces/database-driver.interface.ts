export interface DatabaseDriver {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query(queryString: string, params?: unknown[]): Promise<unknown>;
    insert(collection: string, data: unknown): Promise<unknown>;
    update(collection: string, query: unknown, update: unknown): Promise<unknown>;
    delete(collection: string, query: unknown): Promise<unknown>;
}
