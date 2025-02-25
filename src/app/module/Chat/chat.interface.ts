import { Document, Types } from "mongoose";

export interface IChat extends Document {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
