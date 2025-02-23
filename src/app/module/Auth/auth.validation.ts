// auth.validation.ts
import { z } from "zod";

const register = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const AuthValidation = {
  register,
  login,
};
