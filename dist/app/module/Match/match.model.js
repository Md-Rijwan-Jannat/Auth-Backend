"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const matchSchema = new mongoose_2.Schema({
    user1: { type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["accepted"],
        default: "accepted",
    },
}, {
    timestamps: true,
});
const Match = (0, mongoose_1.model)("Match", matchSchema);
exports.default = Match;
