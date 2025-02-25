"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidation = void 0;
const zod_1 = require("zod");
const messageValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        chat: zod_1.z.string({ required_error: "Chat ID is required" }),
        sender: zod_1.z.string({ required_error: "Sender ID is required" }),
        receiver: zod_1.z.string({ required_error: "Receiver ID is required" }),
        message: zod_1.z.string().min(1, "Message cannot be empty"),
        read: zod_1.z.boolean().optional(),
    }),
});
exports.MessageValidation = {
    messageValidationSchema,
};
