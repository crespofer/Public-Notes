import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
    requestCourse: protectedProcedure
    .input(z.object({
        name: z.string(),
        prefix: z.string(),
        code: z.string(),
    })).mutation(async ({ctx, input}) => {
        const fullCode = input.prefix + input.code;
        const course = await ctx.db.course.findUnique({
            where: {
                code: fullCode,
            }
        })

        // a new course request
        if(course === null) {
            const createdCourse = await ctx.db.course.create({
                data: {
                    name: input.name,
                    code: fullCode,
                }
            })
            return {
                message: null,
                newCourse: createdCourse,
            }
        } else if(course && course.pending === false) { // course already exists
            return {
                message: "Course already exists",
                newCourse: null,
            }

        } else { // course is awaiting review, add new request
            const createdCourse = await ctx.db.course.update({
                where: {
                    code: fullCode,
                },
                data: {
                    count: {increment: 1}
                },
            })
            return {
                message: null,
                newCourse: createdCourse,
            }
        }

    }),

});