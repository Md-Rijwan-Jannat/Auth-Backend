import { z } from "zod";

const createNotification = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required").optional(),
    type: z.enum(["match", "message", "blind_chat", "like", "report"]),
    message: z.string().min(1, "Message is required"),
  }),
});

export const NotificationValidation = {
  createNotification,
};
