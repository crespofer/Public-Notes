import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
    getAllCourses: adminProcedure
    .query(async ({ ctx }) => {
        const courses = await ctx.db.course.findMany();
        return courses;
    })
})