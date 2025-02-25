import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IMessage } from "./message.interface";
import { Message } from "./message.model";
import { Chat } from "../Chat/chat.model";

/**
 * Send a new message
 */
const sendMessage = async (data: IMessage) => {
  const message = await Message.create(data);
  return message;
};

/**
 * Get all messages between two users in a chat
 */
const getMessages = async (chatId: string) => {
  const ifChatExist = await Chat.findById(chatId);

  if (!ifChatExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Chat not found");
  }
  return await Message.find({ chat: chatId })
    .populate("sender", "name email") // Populate sender details
    .populate("receiver", "name email") // Populate receiver details
    .sort({ createdAt: 1 });
};

/**
 * Mark a message as read
 */
const markMessageAsRead = async (messageId: string) => {
  const ifMessageExist = await Message.findById(messageId);

  if (!ifMessageExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }
  return await Message.findByIdAndUpdate(
    messageId,
    { read: true },
    { new: true }
  );
};

/**
 * Mark a message as read
 */
const updateMessage = async (messageId: string, message: string) => {
  const ifMessageExist = await Message.findById(messageId);

  if (!ifMessageExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }

  const result = await Message.findByIdAndUpdate(
    messageId,
    { message: message },
    { new: true }
  );
  return result;
};

/**
 * Delete a message
 */
const deleteMessage = async (messageId: string) => {
  return await Message.findByIdAndDelete(messageId);
};

export const MessageService = {
  sendMessage,
  getMessages,
  markMessageAsRead,
  updateMessage,
  deleteMessage,
};
