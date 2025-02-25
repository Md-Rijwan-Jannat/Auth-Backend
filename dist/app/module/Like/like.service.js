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
exports.LikeService = void 0;
const like_model_1 = require("./like.model");
const match_model_1 = __importDefault(require("../Match/match.model"));
const mongoose_1 = require("mongoose");
const likeUser = (likerId, likedId) => __awaiter(void 0, void 0, void 0, function* () {
    const likerObjectId = new mongoose_1.Types.ObjectId(likerId);
    const likedObjectId = new mongoose_1.Types.ObjectId(likedId);
    // Start a MongoDB session for transaction handling
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        // Check if the like already exists
        const existingLike = yield like_model_1.Like.findOne({
            liker: likerObjectId,
            liked: likedObjectId,
        }).session(session);
        // Check if there's a reverse like (meaning the other user also liked first)
        const reverseLike = yield like_model_1.Like.findOne({
            liker: likedObjectId,
            liked: likerObjectId,
        }).session(session);
        if (existingLike || reverseLike) {
            // If an existing like or mutual like exists, remove the like and the match
            yield like_model_1.Like.deleteMany({
                $or: [
                    { liker: likerObjectId, liked: likedObjectId },
                    { liker: likedObjectId, liked: likerObjectId },
                ],
            }).session(session);
            yield match_model_1.default.deleteOne({
                $or: [
                    { user1: likerObjectId, user2: likedObjectId },
                    { user1: likedObjectId, user2: likerObjectId },
                ],
            }).session(session);
            // Commit transaction
            yield session.commitTransaction();
            session.endSession();
            return null;
        }
        // If no previous like exists, create a like and a match immediately
        yield like_model_1.Like.create([
            {
                liker: likerObjectId,
                liked: likedObjectId,
                status: "matched",
            },
        ], { session });
        const match = yield match_model_1.default.create([
            {
                user1: likerObjectId,
                user2: likedObjectId,
                status: "accepted",
            },
        ], { session });
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return match[0]; // Return the match data
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error}`);
    }
});
exports.LikeService = { likeUser };
