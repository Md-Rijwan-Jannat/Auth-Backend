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
exports.BlindChatService = void 0;
const mongoose_1 = require("mongoose");
const blindChat_model_1 = require("./blindChat.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create a new blind chat session (valid for 10 minutes)
 */
const createBlindChat = (user1, user2) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure valid ObjectId
    if (!mongoose_1.Types.ObjectId.isValid(user1) || !mongoose_1.Types.ObjectId.isValid(user2)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid user IDs provided");
    }
    // Check if a chat already exists between the two users
    const existingChat = yield blindChat_model_1.BlindChat.findOne({
        $or: [
            { user1, user2 },
            { user1: user2, user2: user1 },
        ],
        status: "active",
    });
    if (existingChat) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "A blind chat between these users already exists");
    }
    // Set expiration time (10 minutes from now)
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 10);
    // Create new blind chat
    const blindChat = yield blindChat_model_1.BlindChat.create({ user1, user2, endTime });
    return blindChat;
});
exports.default = createBlindChat;
/**
 * Get all blind chats (optional: filter by user)
 */
const getBlindChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = userId ? { $or: [{ user1: userId }, { user2: userId }] } : {};
    return yield blindChat_model_1.BlindChat.find(filter).populate("user1 user2");
});
/**
 * Get a single blind chat by ID
 */
const getBlindChatById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blindChat_model_1.BlindChat.findById(id).populate("user1 user2");
});
/**
 * Expire blind chat manually
 */
const expireBlindChat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blindChat_model_1.BlindChat.findByIdAndUpdate(id, { status: "expired" }, { new: true });
});
/**
 * Auto-expire blind chats that are past their end time
 */
const autoExpireBlindChats = () => __awaiter(void 0, void 0, void 0, function* () {
    yield blindChat_model_1.BlindChat.updateMany({ status: "active", endTime: { $lt: new Date() } }, { status: "expired" });
});
exports.BlindChatService = {
    createBlindChat,
    getBlindChats,
    getBlindChatById,
    expireBlindChat,
    autoExpireBlindChats,
};
