import Match from "./match.model";
import { IMatch } from "./match.interface";
import { IUser } from "../Auth/auth.interface";
import User from "../Auth/auth.model";
import { Like } from "../Like/like.model";
import { Types, startSession } from "mongoose";

/**
 * Get suggested matches based on shared interests, excluding existing matches.
 */
const getSuggestedMatches = async (userId: string): Promise<IUser[]> => {
  // Fetch the current user and populate interests
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Extract user's interest IDs
  const userInterestIds = user.interests.map((interest) => interest);

  // Get matched users
  const existingMatches = await Match.find({
    $or: [{ user1: userId }, { user2: userId }],
  });

  const matchedUserIds = existingMatches.map((match) =>
    match.user1.toString() === userId
      ? match.user2.toString()
      : match.user1.toString()
  );

  // Fetch matched users
  const matchedUsers = await User.find({
    _id: { $in: matchedUserIds },
  }).populate("interests");

  // Find suggested users (excluding matched users and the current user)
  const potentialUsers = await User.find({
    _id: { $nin: [...matchedUserIds, userId] },
    interests: { $in: userInterestIds }, // Users with matching interests
  }).populate("interests");

  // Combine both matched and suggested users into one array
  const result: IUser[] = [
    ...potentialUsers.map((user) => user),
    ...matchedUsers.map((user) => user),
  ];

  return result;
};
/**
 * Pass a user (ignore for now, no action taken).
 */
const passUser = async (
  passingUserId: string,
  passedUserId: string
): Promise<boolean> => {
  return true; // Placeholder (future logic could blacklist user suggestions)
};

/**
 * Get all matches for a user.
 */
const getUserMatches = async (userId: string): Promise<IMatch[]> => {
  return Match.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: "accepted",
  });
};

/**
 * Unmatch a user, removing both the match and like records.
 */
const unmatchUser = async (matchId: string): Promise<IMatch | null> => {
  const session = await startSession();
  session.startTransaction();

  try {
    const match = await Match.findById(matchId).session(session);

    if (!match) {
      await session.abortTransaction();
      session.endSession();
      return null;
    }

    // Delete the match
    await Match.deleteOne({ _id: matchId }).session(session);

    // Remove associated likes
    await Like.deleteMany({
      $or: [
        { liker: match.user1, liked: match.user2 },
        { liker: match.user2, liked: match.user1 },
      ],
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return match;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Transaction failed: ${error}`);
  }
};

export const MatchingService = {
  getSuggestedMatches,
  passUser,
  getUserMatches,
  unmatchUser,
};
