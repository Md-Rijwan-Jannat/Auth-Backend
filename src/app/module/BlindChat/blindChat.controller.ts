import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BlindChatService } from "./blindChat.service";
import sendResponse from "../../utils/sendResponse";

export const BlindChatController = {
  /**
   * Create a new blind chat session
   */
  createBlindChat: catchAsync(async (req: Request, res: Response) => {
    const { user1, user2 } = req.body;
    const blindChat = await BlindChatService.createBlindChat(user1, user2);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Blind chat created successfully",
      data: blindChat,
    });
  }),

  /**
   * Get all blind chats
   */
  getBlindChats: catchAsync(async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const blindChats = await BlindChatService.getBlindChats(userId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Blind chats retrieved successfully",
      data: blindChats,
    });
  }),

  /**
   * Get a specific blind chat by ID
   */
  getBlindChatById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blindChat = await BlindChatService.getBlindChatById(id);
    if (!blindChat) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Blind chat not found",
        data: null,
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Blind chat retrieved successfully",
      data: blindChat,
    });
  }),

  /**
   * Expire a blind chat manually
   */
  expireBlindChat: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blindChat = await BlindChatService.expireBlindChat(id);
    if (!blindChat) {
      return sendResponse(res, {
        success: false,
        statusCode: 404,
        message: "Blind chat not found",
        data: null,
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Blind chat expired successfully",
      data: blindChat,
    });
  }),
};
