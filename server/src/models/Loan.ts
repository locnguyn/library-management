import mongoose, { Schema } from "mongoose";
import { ILoan } from "src/interfaces/interfaces";

const LoanSchema = new Schema<ILoan>({
    book: { type: Schema.Types.ObjectId, ref: "books", required: true},
    member: { type: Schema.Types.ObjectId, ref: "members", required: true},
    borrowDate: { type: Schema.Types.Date, required: true },
    returnDate: { type: Schema.Types.Date, required: true }
})

export const Loan = mongoose.model<ILoan>('Loan', LoanSchema);
