export default interface IService<T> {
    create(data: Omit<T, "_id">): Promise<T>;
    get(id: string): Promise<T>;
    list(): Promise<T[]>;
    update(id: string, data: Omit<Partial<T>, "_id">): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
