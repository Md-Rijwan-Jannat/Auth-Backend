import { model, Schema } from "mongoose";
import { IBlindChat } from "./blindChat.interafce";

const blindChatSchema = new Schema<IBlindChat>({
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, required: true },
});

export const BlindChat = model("BlindChat", blindChatSchema);
