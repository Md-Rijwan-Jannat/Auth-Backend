import { Types } from "mongoose";
import { IBlindChat } from "./blindChat.interafce";
import { BlindChat } from "./blindChat.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

/**
 * Create a new blind chat session (valid for 10 minutes)
 */

const createBlindChat = async (user1: string, user2: string) => {
  // Ensure valid ObjectId
  if (!Types.ObjectId.isValid(user1) || !Types.ObjectId.isValid(user2)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user IDs provided");
  }

  // Check if a chat already exists between the two users
  const existingChat = await BlindChat.findOne({
    $or: [
      { user1, user2 },
      { user1: user2, user2: user1 },
    ],
    status: "active",
  });

  if (existingChat) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A blind chat between these users already exists"
    );
  }

  // Set expiration time (10 minutes from now)
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + 10);

  // Create new blind chat
  const blindChat = await BlindChat.create({ user1, user2, endTime });
  return blindChat;
};

export default createBlindChat;

/**
 * Get all blind chats (optional: filter by user)
 */
const getBlindChats = async (userId?: string) => {
  const filter = userId ? { $or: [{ user1: userId }, { user2: userId }] } : {};
  return await BlindChat.find(filter).populate("user1 user2");
};

/**
 * Get a single blind chat by ID
 */
const getBlindChatById = async (id: string) => {
  return await BlindChat.findById(id).populate("user1 user2");
};

/**
 * Expire blind chat manually
 */
const expireBlindChat = async (id: string): Promise<IBlindChat | null> => {
  return await BlindChat.findByIdAndUpdate(
    id,
    { status: "expired" },
    { new: true }
  );
};

/**
 * Auto-expire blind chats that are past their end time
 */
const autoExpireBlindChats = async () => {
  await BlindChat.updateMany(
    { status: "active", endTime: { $lt: new Date() } },
    { status: "expired" }
  );
};

export const BlindChatService = {
  createBlindChat,
  getBlindChats,
  getBlindChatById,
  expireBlindChat,
  autoExpireBlindChats,
};
