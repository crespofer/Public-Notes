import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

const acceptedTypes = ["image/jpeg", "image/jpg", "application/pdf", "image/png"]
const maxFileSize = 1024 * 1024  * 4;

export const noteRouter = createTRPCRouter({
    getSignedURL: protectedProcedure
    .input(z.object({
        type: z.string(),
        size: z.number(),
        checksum: z.string(),
        title: z.string(),
        courseId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
        if(!acceptedTypes.includes(input.type)) {
            return {failure: "Invalid file type"}
        }

        if(input.size > maxFileSize) {
            return {failure: "File too large"}
        }

        // all this gets embedded into the url
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: generateFileName(),
            ContentType: input.type,
            ContentLength: input.size,
            ChecksumSHA256: input.checksum,
            Metadata: {
                userId: ctx.session.user.id,
            },
        })

        const signedUrl = await getSignedUrl(s3, putObjectCommand, {
            expiresIn: 60,
        });

        const url = signedUrl.split("?")[0]
        if(!url) {
            throw new Error("Failed to generate signed url");
        }

        const note = await ctx.db.note.create({
            data: {
                Title: input.title,
                url: url,
                fileType: input.type,
                createdById: ctx.session.user.id,
                courseId: input.courseId,
            },
            select: {id: true,}
        })

        return {success: {url: signedUrl, note: note }}

    }),

    getNotesByCourse: protectedProcedure
    .input(z.object({code: z.string()}))
    .query(async ({ctx, input}) => {
        const notes = await ctx.db.course.findUnique({
            where: {
                code: input.code,
            },
            select: {
                name: true,
                notes: {
                    select: {
                        Title: true,
                        createdAt: true,
                        id: true,
                    },
                }
            },
        })

        return notes;
    }),

    getNoteById: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input}) => {
        const note = await ctx.db.note.findUnique({
            where: {id: input.id},
        })

        return note;
    }),

    getUserNotes: protectedProcedure
    .query(async ({ctx}) => {
        const notes = await ctx.db.note.findMany({
            where: {
                createdById: ctx.session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            }
        })

        return notes;
    })

});