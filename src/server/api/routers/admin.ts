import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { Prisma } from '@prisma/client'

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
        }),

        createCourse: adminProcedure
        .input(z.object({
          name: z.string(),
          prefix: z.string(),
          code: z.string(),
          url: z.string(),
        })).mutation(async ({ctx, input}) => {
          try {
            const fullCode = input.prefix + input.code;
            const createdCourse = await ctx.db.course.create({
              data: {
                name: input.name,
                code: fullCode,
                url: input.url,
                pending: false,
              }
            });
            return {success: true, createdCourse: createdCourse};
            
          } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
              if(error.code === 'P2002') {
                return {success: false, message: "Course already exists"};
              }
            }
            throw error;            
          }

        }),

        editCourse: adminProcedure
        .input(z.object({
          id: z.string(),
          name: z.string(),
          prefix: z.string(),
          code: z.string(),
          url: z.string(),
        })).mutation(async ({ ctx, input }) => {
          const fullCode = input.prefix + input.code;

          try {
            const updatedCourse = await ctx.db.course.update({
              where: { id: input.id },
              data: {
                name: input.name,
                code: fullCode,
                url: input.url,
              }
            });
            return {succes: true, updatedCourse: updatedCourse};
            
          } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
              if(error.code === 'P2002') {
                return {succes: false, message: "Name or code already exists"};
              }
            }
            throw error;
          }
        }),

        
});
