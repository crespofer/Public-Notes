import { Code } from "lucide-react";
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

        if(course === null) {
            return ctx.db.course.create({
                data: {
                    name: input.name,
                    code: fullCode,
                }
            })
        } else {
            return ctx.db.course.update({
                where: {
                    code: fullCode,
                },
                data: {
                    count: course.count + 1,
                },
            })
        }

    }),

});