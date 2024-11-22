import mongoose, { Schema } from "mongoose";
import { IBook } from "src/interfaces/interfaces";

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  copies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
});

BookSchema.index({title: 'text', author: 'text'});

export const Book = mongoose.model<IBook>("Book", BookSchema);
