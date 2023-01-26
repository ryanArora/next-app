import { signupSchema } from "@/common/schema/auth";
import { publicProcedure } from "@/server/api/trpc";
import { makeSessionCreateOptions, type Session } from "@/server/auth";
import bcrypt from "bcrypt";

export const signupProcedure = publicProcedure
  .input(signupSchema)
  .mutation(async ({ ctx, input }) => {
    const sessionCreateOptions = makeSessionCreateOptions();

    const user = await ctx.prisma.user.create({
      data: {
        username: input.username,
        passwordHash: await bcrypt.hash(input.password, 10), // 10 salt rounds
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
