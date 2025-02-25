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
exports.ChatService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const chat_model_1 = require("./chat.model");
const createChat = (user1, user2) => __awaiter(void 0, void 0, void 0, function* () {
    if (user1 === user2) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Users cannot chat with themselves");
    }
    // Check if a chat already exists between the two users
    const existingChat = yield chat_model_1.Chat.findOne({
        $or: [
            { user1, user2 },
            { user1: user2, user2: user1 },
        ],
    });
    if (existingChat) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "A chat between these users already exists");
    }
    // Create and return the new chat
    const chat = yield chat_model_1.Chat.create({ user1, user2 });
    return chat;
});
const getUserChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chat_model_1.Chat.find({
        $or: [{ user1: userId }, { user2: userId }],
    }).populate(["user1", "user2"]);
});
const getChatById = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chat_model_1.Chat.findById(chatId).populate(["user1", "user2"]);
});
const deleteChat = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chat_model_1.Chat.findByIdAndDelete(chatId);
});
exports.ChatService = {
    createChat,
    getUserChats,
    getChatById,
    deleteChat,
};
