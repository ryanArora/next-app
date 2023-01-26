import { z } from "zod";

import crypto from "node:crypto";
import { createTRPCRouter } from "../../trpc";
import { loginProcedure } from "./login";

export const usernameSchema = z
  .string()
  .min(2, "Username must be at least 2 characters.")
  .max(16, "Username must be 16 characters or less.");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(255, "Password must be 255 characters or less.");

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const makeSessionCreateOptions = () => {
  return {
    id: crypto.randomBytes(64).toString("hex"), // 128 characters
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };
};

export const authRouter = createTRPCRouter({
  login: loginProcedure,
});
