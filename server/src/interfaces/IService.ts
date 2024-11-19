export default interface IService<T> {
    create(data: Omit<T, "_id">): Promise<T | null>;
    list(): Promise<T[]>;
    update(id: string, data: Omit<Partial<T>, "_id">): Promise<T | null>;
}
