import { z } from "zod";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Chat Validation Schema
const chatValidationSchema = z.object({
  body: z.object({
    user1: objectIdSchema,
    user2: objectIdSchema,
  }),
});

export const ChatValidation = {
  chatValidationSchema,
};
