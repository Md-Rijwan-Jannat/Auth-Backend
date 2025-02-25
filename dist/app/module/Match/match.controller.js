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
exports.MatchingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const match_service_1 = require("./match.service");
const getSuggestedMatches = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assuming user ID is available in the request
    const suggestions = yield match_service_1.MatchingService.getSuggestedMatches(userId);
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 200,
        message: "Suggestions get successfully",
        data: suggestions,
    });
}));
const passUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passedUserId = req.params.userId;
    const passingUserId = req.user.id; // Assuming the logged-in user ID
    const result = yield match_service_1.MatchingService.passUser(passingUserId, passedUserId);
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 200,
        message: "User passed successfully",
        data: result,
    });
}));
const getUserMatches = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assuming user ID is available in the request
    const matches = yield match_service_1.MatchingService.getUserMatches(userId);
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 200,
        message: "User matches fetched successfully",
        data: matches,
    });
}));
const unmatchUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.params.id;
    const unmatch = yield match_service_1.MatchingService.unmatchUser(matchId);
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode: 200,
        message: "User unmatched successfully",
        data: unmatch,
    });
}));
exports.MatchingController = {
    getSuggestedMatches,
    passUser,
    getUserMatches,
    unmatchUser,
};
