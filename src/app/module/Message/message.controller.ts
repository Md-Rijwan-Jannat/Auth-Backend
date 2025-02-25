import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { MessageService } from "./message.service";
import sendResponse from "../../utils/sendResponse";

/**
 * Send a message
 */
const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const newMessage = await MessageService.sendMessage(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Message sent successfully",
    data: newMessage,
  });
});

/**
 * Get all messages from a chat
 */
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const messages = await MessageService.getMessages(chatId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Messages retrieved successfully",
    data: messages,
  });
});

/**
 * Mark a message as read
 */
const markMessageAsRead = catchAsync(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const updatedMessage = await MessageService.markMessageAsRead(messageId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Message marked as read",
    data: updatedMessage,
  });
});

/**
 * Message update
 */
const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const { message } = req.body;
  const updatedMessage = await MessageService.updateMessage(messageId, message);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Message update successfully",
    data: updatedMessage,
  });
});

/**
 * Delete a message
 */
const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const result = await MessageService.deleteMessage(messageId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Message deleted successfully",
    data: result,
  });
});

export const MessageController = {
  sendMessage,
  getMessages,
  markMessageAsRead,
  updateMessage,
  deleteMessage,
};
