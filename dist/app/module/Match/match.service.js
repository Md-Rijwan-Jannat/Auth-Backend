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
exports.MatchingService = void 0;
const match_model_1 = __importDefault(require("./match.model"));
const auth_model_1 = __importDefault(require("../Auth/auth.model"));
const like_model_1 = require("../Like/like.model");
const mongoose_1 = require("mongoose");
/**
 * Get suggested matches based on shared interests, excluding existing matches.
 */
const getSuggestedMatches = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the current user and populate interests
    const user = yield auth_model_1.default.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    // Extract user's interest IDs
    const userInterestIds = user.interests.map((interest) => interest);
    // Get matched users
    const existingMatches = yield match_model_1.default.find({
        $or: [{ user1: userId }, { user2: userId }],
    });
    const matchedUserIds = existingMatches.map((match) => match.user1.toString() === userId
        ? match.user2.toString()
        : match.user1.toString());
    // Fetch matched users
    const matchedUsers = yield auth_model_1.default.find({
        _id: { $in: matchedUserIds },
    }).populate("interests");
    // Find suggested users (excluding matched users and the current user)
    const potentialUsers = yield auth_model_1.default.find({
        _id: { $nin: [...matchedUserIds, userId] },
        interests: { $in: userInterestIds }, // Users with matching interests
    }).populate("interests");
    // Combine both matched and suggested users into one array
    const result = [
        ...potentialUsers.map((user) => user),
        ...matchedUsers.map((user) => user),
    ];
    return result;
});
/**
 * Pass a user (ignore for now, no action taken).
 */
const passUser = (passingUserId, passedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    return true; // Placeholder (future logic could blacklist user suggestions)
});
/**
 * Get all matches for a user.
 */
const getUserMatches = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return match_model_1.default.find({
        $or: [{ user1: userId }, { user2: userId }],
        status: "accepted",
    });
});
/**
 * Unmatch a user, removing both the match and like records.
 */
const unmatchUser = (matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const match = yield match_model_1.default.findById(matchId).session(session);
        if (!match) {
            yield session.abortTransaction();
            session.endSession();
            return null;
        }
        // Delete the match
        yield match_model_1.default.deleteOne({ _id: matchId }).session(session);
        // Remove associated likes
        yield like_model_1.Like.deleteMany({
            $or: [
                { liker: match.user1, liked: match.user2 },
                { liker: match.user2, liked: match.user1 },
            ],
        }).session(session);
        yield session.commitTransaction();
        session.endSession();
        return match;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error}`);
    }
});
exports.MatchingService = {
    getSuggestedMatches,
    passUser,
    getUserMatches,
    unmatchUser,
};
