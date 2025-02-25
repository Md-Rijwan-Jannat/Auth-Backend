"use strict";
// auth.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const auth_interface_1 = require("./auth.interface");
exports.AuthValidation = {
    register: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
            email: zod_1.z.string().email("Invalid email format"),
            password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
            age: zod_1.z.number().min(18, "Age must be at least 18"),
            gender: zod_1.z.enum(["male", "female", "non-binary"]),
            location: zod_1.z.string().min(3, "Location must be at least 3 characters"),
            role: zod_1.z.nativeEnum(auth_interface_1.UserRole).optional(),
            status: zod_1.z.nativeEnum(auth_interface_1.UserStatus).optional(),
            bio: zod_1.z.string().optional(),
            profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
            interests: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    }),
    login: zod_1.z.object({
        body: zod_1.z.object({
            email: zod_1.z.string().email("Invalid email format"),
            password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        }),
    }),
    updateProfile: zod_1.z.object({
        body: zod_1.z
            .object({
            name: zod_1.z.string().min(2).optional(),
            email: zod_1.z.string().email().optional(),
            age: zod_1.z.number().min(18).optional(),
            gender: zod_1.z.enum(["male", "female", "non-binary"]).optional(),
            location: zod_1.z.string().min(3).optional(),
            bio: zod_1.z.string().optional(),
            profilePhoto: zod_1.z.string().url().optional(),
            interests: zod_1.z.array(zod_1.z.string()).optional(),
        })
            .partial(), // Allow partial updates
    }),
    changePassword: zod_1.z.object({
        body: zod_1.z.object({
            oldPassword: zod_1.z
                .string()
                .min(6, "Old password must be at least 6 characters"),
            newPassword: zod_1.z
                .string()
                .min(6, "New password must be at least 6 characters"),
        }),
    }),
};
