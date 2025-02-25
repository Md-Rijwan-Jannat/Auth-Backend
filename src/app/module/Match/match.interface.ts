// match.interface.ts
import { Types } from "mongoose";

export interface IMatch {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  status: "accepted";
}
