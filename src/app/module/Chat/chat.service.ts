import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IChat } from "./chat.interface";
import { Chat } from "./chat.model";

const createChat = async (user1: string, user2: string): Promise<IChat> => {
  if (user1 === user2) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Users cannot chat with themselves"
    );
  }

  // Check if a chat already exists between the two users
  const existingChat = await Chat.findOne({
    $or: [
      { user1, user2 },
      { user1: user2, user2: user1 },
    ],
  });

  if (existingChat) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A chat between these users already exists"
    );
  }

  // Create and return the new chat
  const chat = await Chat.create({ user1, user2 });
  return chat;
};

const getUserChats = async (userId: string): Promise<IChat[]> => {
  return await Chat.find({
    $or: [{ user1: userId }, { user2: userId }],
  }).populate(["user1", "user2"]);
};

const getChatById = async (chatId: string): Promise<IChat | null> => {
  return await Chat.findById(chatId).populate(["user1", "user2"]);
};

const deleteChat = async (chatId: string): Promise<IChat | null> => {
  return await Chat.findByIdAndDelete(chatId);
};

export const ChatService = {
  createChat,
  getUserChats,
  getChatById,
  deleteChat,
};
