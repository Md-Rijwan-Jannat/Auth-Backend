"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const message_service_1 = require("./message.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
/**
 * Send a message
 */
const sendMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield message_service_1.MessageService.sendMessage(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Message sent successfully",
        data: newMessage,
    });
}));
/**
 * Get all messages from a chat
 */
const getMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const messages = yield message_service_1.MessageService.getMessages(chatId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Messages retrieved successfully",
        data: messages,
    });
}));
/**
 * Mark a message as read
 */
const markMessageAsRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const updatedMessage = yield message_service_1.MessageService.markMessageAsRead(messageId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Message marked as read",
        data: updatedMessage,
    });
}));
/**
 * Message update
 */
const updateMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const { message } = req.body;
    const updatedMessage = yield message_service_1.MessageService.updateMessage(messageId, message);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Message update successfully",
        data: updatedMessage,
    });
}));
/**
 * Delete a message
 */
const deleteMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const result = yield message_service_1.MessageService.deleteMessage(messageId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Message deleted successfully",
        data: result,
    });
}));
exports.MessageController = {
    sendMessage,
    getMessages,
    markMessageAsRead,
    updateMessage,
    deleteMessage,
};
