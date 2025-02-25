"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindChat = void 0;
const mongoose_1 = require("mongoose");
const blindChatSchema = new mongoose_1.Schema({
    user1: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, required: true },
});
exports.BlindChat = (0, mongoose_1.model)("BlindChat", blindChatSchema);
