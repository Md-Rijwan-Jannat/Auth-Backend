// auth.validation.ts

import { z } from "zod";
import { UserRole, UserStatus } from "./auth.interface";

export const AuthValidation = {
  register: z.object({
    body: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      age: z.number().min(18, "Age must be at least 18"),
      gender: z.enum(["male", "female", "non-binary"]),
      location: z.string().min(3, "Location must be at least 3 characters"),
      role: z.nativeEnum(UserRole).optional(),
      status: z.nativeEnum(UserStatus).optional(),
      bio: z.string().optional(),
      profilePhoto: z.string().url("Invalid URL").optional(),
      interests: z.array(z.string()).optional(),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }),
  }),

  updateProfile: z.object({
    body: z
      .object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        age: z.number().min(18).optional(),
        gender: z.enum(["male", "female", "non-binary"]).optional(),
        location: z.string().min(3).optional(),
        bio: z.string().optional(),
        profilePhoto: z.string().url().optional(),
        interests: z.array(z.string()).optional(),
      })
      .partial(), // Allow partial updates
  }),

  changePassword: z.object({
    body: z.object({
      oldPassword: z
        .string()
        .min(6, "Old password must be at least 6 characters"),
      newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
    }),
  }),
};
