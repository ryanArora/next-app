import { loginSchema } from "@/common/schema/auth";
import { publicProcedure } from "@/server/api/trpc";
import {
  makeSessionCreateOptions,
  verifyCredentials,
  type Session,
} from "@/server/auth";
import { TRPCError } from "@trpc/server";

export const loginProcedure = publicProcedure
  .input(loginSchema)
  .mutation(async ({ ctx, input }) => {
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

    const sessionCreateOptions = makeSessionCreateOptions();

    // Create a new session for the user.
    await ctx.prisma.user.update({
      where: { id: user.id },
      data: {
        sessions: {
          create: sessionCreateOptions,
        },
      },
    });

    const session: Session = {
      ...sessionCreateOptions,
      user: {
        id: user.id,
        username: user.username,
      },
    };

    return session;
  });
