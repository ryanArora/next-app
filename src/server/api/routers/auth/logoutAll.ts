import { TRPCError } from "@trpc/server";
import { loginSchema } from ".";
import { verifyCredentials } from "../../../auth";
import { protectedProcedure } from "../../trpc";

export const logoutAllProcedure = protectedProcedure
  .input(loginSchema)
  .mutation(async ({ input, ctx }) => {
    const [validCredentials, user] = await verifyCredentials({
      inputCredentials: { username: input.username, password: input.password },
      prisma: ctx.prisma,
    });

    if (!validCredentials) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Password mismatch.",
      });
    }

    await ctx.prisma.session.deleteMany({ where: { userId: user.id } });
  });
