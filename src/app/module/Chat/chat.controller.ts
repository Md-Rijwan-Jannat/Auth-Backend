import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ChatService } from "./chat.service";

/**
 * Create a new chat session
 */
const createChat = catchAsync(async (req: Request, res: Response) => {
  const { user1, user2 } = req.body;
  const chat = await ChatService.createChat(user1, user2);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Chat created successfully",
    data: chat,
  });
});

/**
 * Get all chats for a specific user
 */
const getUserChats = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const chats = await ChatService.getUserChats(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Chats retrieved successfully",
    data: chats,
  });
});

/**
 * Get a specific chat by ID
 */
const getChatById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const chat = await ChatService.getChatById(id);

  if (!chat) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Chat not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Chat retrieved successfully",
    data: chat,
  });
});

/**
 * Delete a chat
 */
const deleteChat = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedChat = await ChatService.deleteChat(id);

  if (!deletedChat) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Chat not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Chat deleted successfully",
    data: deletedChat,
  });
});

export const ChatController = {
  createChat,
  getUserChats,
  getChatById,
  deleteChat,
};
