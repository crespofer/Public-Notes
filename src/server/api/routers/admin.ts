import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAllApprovedCourses: adminProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findMany({
      where: {
        pending: false,
      },
    });
    return courses;
  }),

  getAllPendingCourses: adminProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findMany({
      where: {
        pending: true,
      },
    });
    return courses;
  }),
});
