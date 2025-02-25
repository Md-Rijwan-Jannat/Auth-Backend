import { Document, Types } from "mongoose";

export interface IBlindChat extends Document {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  status: "active" | "expired";
  startTime: Date;
  endTime: Date;
}
