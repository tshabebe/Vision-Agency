import { artOrder, uploadFile, ZInsertUploadFiletSchema } from '@/db/schema';
import { authedProcedure, publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { ZSelectArtOrderSchema } from '../../db/schema/art';

export const uploadFileRouter = router({
  uploadFile: authedProcedure
    .input(ZInsertUploadFiletSchema)
    .mutation(async (opts) => {
      try {
        await db.insert(uploadFile).values({
          artUrl: opts.input.artUrl,
          description: opts.input.description,
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not save your files please try again',
          cause: error,
        });
      }
    }),

  deleteOrder: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(artOrder).where(eq(artOrder.id, input.id));
    }),

  deleteImage: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(uploadFile).where(eq(uploadFile.id, input.id));
    }),

  getAllUploadFiles: publicProcedure.query(async () => {
    try {
      const data = await db.select().from(uploadFile);
      return data;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not get your files please try again',
        cause: error,
      });
    }
  }),
  confirmOrder: authedProcedure
    .input(ZSelectArtOrderSchema.pick({ status: true, id: true }))
    .mutation(async (opts) => {
      try {
        await opts.ctx.db
          .update(artOrder)
          .set({ status: opts.input.status })
          .where(eq(artOrder.id, opts.input.id));
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not update your status please try again',
          cause: error,
        });
      }
    }),
  getAllOrderedFiles: authedProcedure
    .input(ZSelectArtOrderSchema.pick({ status: true }))
    .query(async (opts) => {
      try {
        const data = await db.query.artOrder.findMany({
          where: (artOrder, { eq }) => eq(artOrder.status, opts.input.status),
          with: {
            uploadFile: {
              columns: {
                artUrl: true,
                description: true,
              },
            },
            user: {
              columns: {
                email: true,
                name: true,
              },
            },
          },
        });
        return data;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not get your files please try again',
          cause: error,
        });
      }
    }),
});
