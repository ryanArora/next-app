import bcrypt from "bcrypt";
import { signupSchema } from "../../../../common/schema/auth";
import { makeSessionCreateOptions, type Session } from "../../../auth";
import { publicProcedure } from "../../trpc";

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
