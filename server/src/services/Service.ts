import { Document, Model } from "mongoose";

export class Service<T extends Document> {
  constructor(protected model: Model<T>) {}

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return await doc.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async search(searchTerm: string): Promise<T[]> {
    return this.model.find({
      $text: {
        $search: searchTerm,
      },
    });
  }
}
