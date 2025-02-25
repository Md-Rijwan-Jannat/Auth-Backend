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
exports.BlindChatController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blindChat_service_1 = require("./blindChat.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.BlindChatController = {
    /**
     * Create a new blind chat session
     */
    createBlindChat: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user1, user2 } = req.body;
        const blindChat = yield blindChat_service_1.BlindChatService.createBlindChat(user1, user2);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 201,
            message: "Blind chat created successfully",
            data: blindChat,
        });
    })),
    /**
     * Get all blind chats
     */
    getBlindChats: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.query.userId;
        const blindChats = yield blindChat_service_1.BlindChatService.getBlindChats(userId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Blind chats retrieved successfully",
            data: blindChats,
        });
    })),
    /**
     * Get a specific blind chat by ID
     */
    getBlindChatById: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const blindChat = yield blindChat_service_1.BlindChatService.getBlindChatById(id);
        if (!blindChat) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 404,
                message: "Blind chat not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Blind chat retrieved successfully",
            data: blindChat,
        });
    })),
    /**
     * Expire a blind chat manually
     */
    expireBlindChat: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const blindChat = yield blindChat_service_1.BlindChatService.expireBlindChat(id);
        if (!blindChat) {
            return (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 404,
                message: "Blind chat not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Blind chat expired successfully",
            data: blindChat,
        });
    })),
};
