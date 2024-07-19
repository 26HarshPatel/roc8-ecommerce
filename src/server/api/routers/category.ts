import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface PaginatedResponse {
  id: number;
  name: string;
}

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({ data: { name: input.name } });
    }),

  getPaginated: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.category.findMany({
        skip: (input.page - 1) * input.limit,
        take: input.limit,
        orderBy: {
          createdAt: "asc",
        },
      });
      const responseData: PaginatedResponse[] = [];
      data.forEach((el) => {
        responseData.push({
          id: el.id,
          name: el.name,
        });
      });
      const count = await ctx.db.category.count();
      return { category: responseData, count: Math.ceil(count / input.limit) };
    }),
});
