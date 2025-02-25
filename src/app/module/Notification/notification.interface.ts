import { Document, Schema } from "mongoose";

export interface INotification extends Document {
  user: Schema.Types.ObjectId;
  type: "match" | "message" | "blind_chat" | "like" | "report";
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
