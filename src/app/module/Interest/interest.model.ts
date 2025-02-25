import mongoose, { Schema } from "mongoose";
import { IInterest } from "./interest.interface";

const interestSchema = new Schema<IInterest>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Interest = mongoose.model<IInterest>("Interest", interestSchema);
export default Interest;
