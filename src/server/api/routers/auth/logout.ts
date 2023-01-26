import { protectedProcedure } from "@/server/api/trpc";

export const logoutProcedure = protectedProcedure.mutation(async ({ ctx }) => {
  await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
});
