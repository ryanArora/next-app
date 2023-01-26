import { TRPCError } from "@trpc/server";
import { loginSchema, makeSessionCreateOptions } from ".";
import { verifyCredentials, type Session } from "../../../auth";
import { publicProcedure } from "../../trpc";

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
