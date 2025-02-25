import { model } from "mongoose";
import { Schema } from "mongoose";
import { IMatch } from "./match.interface";

const matchSchema = new Schema<IMatch>(
  {
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["accepted"],
      default: "accepted",
    },
  },
  {
    timestamps: true,
  }
);

const Match = model("Match", matchSchema);
export default Match;
