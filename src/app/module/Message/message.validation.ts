import { z } from "zod";

const messageValidationSchema = z.object({
  body: z.object({
    chat: z.string({ required_error: "Chat ID is required" }),
    sender: z.string({ required_error: "Sender ID is required" }),
    receiver: z.string({ required_error: "Receiver ID is required" }),
    message: z.string().min(1, "Message cannot be empty"),
    read: z.boolean().optional(),
  }),
});

export const MessageValidation = {
  messageValidationSchema,
};
