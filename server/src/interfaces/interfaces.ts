import { Document, Schema } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    copies: number;
    availableCopies: number;
}

export interface IMember extends Document {
    name: string;
    email: string;
}

export interface ILoan extends Document {
    book: Schema.Types.ObjectId;
    member: Schema.Types.ObjectId;
    borrowDate: Schema.Types.Date;
    returnDate: Schema.Types.Date;
}
