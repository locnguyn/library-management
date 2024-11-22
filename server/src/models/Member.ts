import mongoose, { Schema } from "mongoose";
import { IMember } from "src/interfaces/interfaces";

const MemberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

MemberSchema.index({name: 'text', email: 'text'});

export const Member = mongoose.model<IMember>('Member', MemberSchema);
