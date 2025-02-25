// like.interface.ts
import { ObjectId } from "mongoose";

export interface ILike {
  liker: ObjectId;
  liked: ObjectId;
  status: "matched";
}
