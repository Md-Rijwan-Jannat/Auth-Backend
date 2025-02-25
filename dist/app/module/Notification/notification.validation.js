"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationValidation = void 0;
const zod_1 = require("zod");
const createNotification = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, "User ID is required").optional(),
        type: zod_1.z.enum(["match", "message", "blind_chat", "like", "report"]),
        message: zod_1.z.string().min(1, "Message is required"),
    }),
});
exports.NotificationValidation = {
    createNotification,
};
