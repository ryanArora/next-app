import { createTRPCRouter } from "@/server/api/trpc";
import { loginProcedure } from "./login";
import { logoutProcedure } from "./logout";
import { logoutAllProcedure } from "./logoutAll";
import { signupProcedure } from "./signup";

export const authRouter = createTRPCRouter({
  login: loginProcedure,
  signup: signupProcedure,
  logout: logoutProcedure,
  logoutAll: logoutAllProcedure,
});
