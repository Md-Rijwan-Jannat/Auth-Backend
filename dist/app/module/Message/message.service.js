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
exports.MessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const message_model_1 = require("./message.model");
const chat_model_1 = require("../Chat/chat.model");
/**
 * Send a new message
 */
const sendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield message_model_1.Message.create(data);
    return message;
});
/**
 * Get all messages between two users in a chat
 */
const getMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const ifChatExist = yield chat_model_1.Chat.findById(chatId);
    if (!ifChatExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chat not found");
    }
    return yield message_model_1.Message.find({ chat: chatId })
        .populate("sender", "name email") // Populate sender details
        .populate("receiver", "name email") // Populate receiver details
        .sort({ createdAt: 1 });
});
/**
 * Mark a message as read
 */
const markMessageAsRead = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const ifMessageExist = yield message_model_1.Message.findById(messageId);
    if (!ifMessageExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Message not found");
    }
    return yield message_model_1.Message.findByIdAndUpdate(messageId, { read: true }, { new: true });
});
/**
 * Mark a message as read
 */
const updateMessage = (messageId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const ifMessageExist = yield message_model_1.Message.findById(messageId);
    if (!ifMessageExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Message not found");
    }
    const result = yield message_model_1.Message.findByIdAndUpdate(messageId, { message: message }, { new: true });
    return result;
});
/**
 * Delete a message
 */
const deleteMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.Message.findByIdAndDelete(messageId);
});
exports.MessageService = {
    sendMessage,
    getMessages,
    markMessageAsRead,
    updateMessage,
    deleteMessage,
};
