import Match from "./match.model";
import { IMatch } from "./match.interface";
import { IUser } from "../Auth/auth.interface";
import User from "../Auth/auth.model";

const getSuggestedMatches = async (userId: string): Promise<IUser[]> => {
  // Logic to get suggested matches based on interests
  // For now, assuming a basic implementation:
  const user = await User.findById(userId).populate("interests");
  const suggestedUsers = await User.find({ _id: { $ne: userId } }).populate(
    "interests"
  );

  // Filter users based on some interest matching logic
  const matches = suggestedUsers.filter((suggestedUser) => {
    return suggestedUser.interests.some((interest) =>
      user?.interests.includes(interest)
    );
  });

  return matches;
};

const likeUser = async (
  likingUserId: string,
  likedUserId: string
): Promise<IMatch> => {
  // Logic to like a user and create a match if both like each other
  let match = await Match.findOne({ user1: likingUserId, user2: likedUserId });

  if (!match) {
    match = await Match.create({ user1: likingUserId, user2: likedUserId });
  }

  // Logic for creating a match if both users like each other can be added here

  return match;
};

const passUser = async (
  passingUserId: string,
  passedUserId: string
): Promise<boolean> => {
  // Logic to handle passing a user (no match)
  return true;
};

const getUserMatches = async (userId: string): Promise<IMatch[]> => {
  // Fetch matches for a user
  const matches = await Match.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: "accepted",
  });
  return matches;
};

const unmatchUser = async (matchId: string): Promise<IMatch | null> => {
  // Unmatch users (delete match)
  const match = await Match.findByIdAndDelete(matchId);
  return match;
};

export const MatchingService = {
  getSuggestedMatches,
  likeUser,
  passUser,
  getUserMatches,
  unmatchUser,
};
