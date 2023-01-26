import { loginSchema } from "@/common/schema/auth";
import { protectedProcedure } from "@/server/api/trpc";
import { verifyCredentials } from "@/server/auth";
import { TRPCError } from "@trpc/server";

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
