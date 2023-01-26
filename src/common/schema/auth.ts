import { z } from "zod";

export const usernameSchema = z
  .string()
  .describe("Username")
  .regex(/^[a-zA-Z0-9]*$/, "Username must be alphanumeric.")
  .min(2, "Username must be at least 2 characters.")
  .max(16, "Username must be 16 characters or less.");

export const passwordSchema = z
  .string()
  .describe("Password")
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
