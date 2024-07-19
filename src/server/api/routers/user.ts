import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello from user side.`,
    };
  }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return password === user.password;
    }),

  gerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email } = input;
      console.log("input email =", email);
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  updateUserMarkedCatetories: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        markedCategories: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, markedCategories } = input;
      const user = await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          markedCategories,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8).max(12),
        isEmailVerified: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          isEmailVerified: input.isEmailVerified,
        },
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), isEmailVerified: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          isEmailVerified: input.isEmailVerified,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      orderBy: { id: "asc" },
    });
  }),
});
