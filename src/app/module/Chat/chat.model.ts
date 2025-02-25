import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const chatSchema = new Schema<IChat>(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = model("Chat", chatSchema);
