"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// Helper function to validate MongoDB ObjectId
const objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
// Chat Validation Schema
const chatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user1: objectIdSchema,
        user2: objectIdSchema,
    }),
});
exports.ChatValidation = {
    chatValidationSchema,
};
