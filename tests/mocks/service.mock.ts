export class MockCrudService<T extends { id: string | number }> {
    private data: T[] = [];

    public create(item: T): Promise<T> {
        this.data.push(item);
        return Promise.resolve(item);
    }

    public read(): Promise<T[]> {
        return Promise.resolve(this.data);
    }

    public readById(id: string | number): Promise<T> {
        const item = this.data.find(dataItem => dataItem.id === id);
        if (item) {
            return Promise.resolve(item);
        }
        return Promise.reject(new Error('Item not found'));
    }

    public update(item: T): Promise<T> {
        const index = this.data.findIndex(dataItem => dataItem.id === item.id);
        if (index !== -1) {
            this.data[index] = item;
            return Promise.resolve(item);
        }
        return Promise.reject(new Error('Item not found'));
    }

    public delete(id: string | number): Promise<void> {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return Promise.resolve();
        }
        return Promise.reject(new Error('Item not found'));
    }
}

export default MockCrudService;
