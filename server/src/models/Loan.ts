import mongoose, { Schema } from "mongoose";
import { ILoan } from "src/interfaces/interfaces";

const LoanSchema = new Schema<ILoan>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true},
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true},
    borrowDate: { type: Schema.Types.Date, required: true, default: new Date() },
    returnDate: { type: Schema.Types.Date, required: true }
});

export const Loan = mongoose.model<ILoan>('Loan', LoanSchema);
