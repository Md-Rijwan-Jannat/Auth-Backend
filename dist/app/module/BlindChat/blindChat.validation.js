"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindChatValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// Helper function to validate MongoDB ObjectId
const objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
// Blind Chat Schema Validation
const blindChatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user1: objectIdSchema,
        user2: objectIdSchema,
        status: zod_1.z.enum(["active", "expired"]).default("active"),
        startTime: zod_1.z.date().optional(),
        endTime: zod_1.z.date().optional(),
    }),
});
// Validation for updating blind chat
const updateBlindChatValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["active", "expired"]).optional(),
        endTime: zod_1.z.date().optional(),
    }),
});
exports.BlindChatValidation = {
    blindChatValidationSchema,
    updateBlindChatValidationSchema,
};
