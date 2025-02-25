import { model, Schema } from "mongoose";

const likeSchema = new Schema(
  {
    liker: { type: Schema.Types.ObjectId, ref: "User", required: true },
    liked: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["matched"],
      default: "matched",
    },
  },
  {
    timestamps: true,
  }
);

export const Like = model("Like", likeSchema);
