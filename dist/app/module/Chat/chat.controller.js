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
exports.ChatController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const chat_service_1 = require("./chat.service");
/**
 * Create a new chat session
 */
const createChat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user1, user2 } = req.body;
    const chat = yield chat_service_1.ChatService.createChat(user1, user2);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Chat created successfully",
        data: chat,
    });
}));
/**
 * Get all chats for a specific user
 */
const getUserChats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const chats = yield chat_service_1.ChatService.getUserChats(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Chats retrieved successfully",
        data: chats,
    });
}));
/**
 * Get a specific chat by ID
 */
const getChatById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const chat = yield chat_service_1.ChatService.getChatById(id);
    if (!chat) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Chat not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Chat retrieved successfully",
        data: chat,
    });
}));
/**
 * Delete a chat
 */
const deleteChat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedChat = yield chat_service_1.ChatService.deleteChat(id);
    if (!deletedChat) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Chat not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Chat deleted successfully",
        data: deletedChat,
    });
}));
exports.ChatController = {
    createChat,
    getUserChats,
    getChatById,
    deleteChat,
};
