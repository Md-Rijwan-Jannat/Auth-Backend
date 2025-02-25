import { Like } from "./like.model";
import { IMatch } from "../Match/match.interface";
import Match from "../Match/match.model";
import { Types, startSession } from "mongoose";

const likeUser = async (
  likerId: string,
  likedId: string
): Promise<IMatch | null> => {
  const likerObjectId = new Types.ObjectId(likerId);
  const likedObjectId = new Types.ObjectId(likedId);

  // Start a MongoDB session for transaction handling
  const session = await startSession();
  session.startTransaction();

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({
      liker: likerObjectId,
      liked: likedObjectId,
    }).session(session);

    // Check if there's a reverse like (meaning the other user also liked first)
    const reverseLike = await Like.findOne({
      liker: likedObjectId,
      liked: likerObjectId,
    }).session(session);

    if (existingLike || reverseLike) {
      // If an existing like or mutual like exists, remove the like and the match
      await Like.deleteMany({
        $or: [
          { liker: likerObjectId, liked: likedObjectId },
          { liker: likedObjectId, liked: likerObjectId },
        ],
      }).session(session);

      await Match.deleteOne({
        $or: [
          { user1: likerObjectId, user2: likedObjectId },
          { user1: likedObjectId, user2: likerObjectId },
        ],
      }).session(session);

      // Commit transaction
      await session.commitTransaction();
      session.endSession();

      return null;
    }

    // If no previous like exists, create a like and a match immediately
    await Like.create(
      [
        {
          liker: likerObjectId,
          liked: likedObjectId,
          status: "matched",
        },
      ],
      { session }
    );

    const match = await Match.create(
      [
        {
          user1: likerObjectId,
          user2: likedObjectId,
          status: "accepted",
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return match[0]; // Return the match data
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Transaction failed: ${error}`);
  }
};

export const LikeService = { likeUser };
