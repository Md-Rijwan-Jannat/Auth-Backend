import { z } from "zod";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Blind Chat Schema Validation
const blindChatValidationSchema = z.object({
  body: z.object({
    user1: objectIdSchema,
    user2: objectIdSchema,
    status: z.enum(["active", "expired"]).default("active"),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
  }),
});

// Validation for updating blind chat
const updateBlindChatValidationSchema = z.object({
  body: z.object({
    status: z.enum(["active", "expired"]).optional(),
    endTime: z.date().optional(),
  }),
});

export const BlindChatValidation = {
  blindChatValidationSchema,
  updateBlindChatValidationSchema,
};
