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

  denyCourse: adminProcedure
    .input(z.object({courseId: z.string()}))
    .mutation(async ({ctx, input}) => {
      const deniedCourse = await ctx.db.course.delete({
        where: {id: input.courseId},
      })
      return deniedCourse;
    }),

    approveCourse: adminProcedure
      .input(z.object({
        courseId: z.string(),
        courseName: z.string(),
        coursePrefix: z.string(),
        courseCode: z.string(),
        courseUrl: z.string(),
        })).mutation(async ({ctx, input}) => {
          const fullCode = input.coursePrefix + input.courseCode;

          const approvedCourse = await ctx.db.course.update({
            where: {
              id: input.courseId,
            },
            data: {
              name: input.courseName,
              code: fullCode,
              url: input.courseUrl,
              pending: false,
            }
          })

          return approvedCourse;
        })
});
