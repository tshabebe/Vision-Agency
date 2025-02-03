import { artOrder, uploadFile, ZInsertUploadFiletSchema } from '@/db/schema';
import { authedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

export const uploadFileRouter = router({
  uploadFile: authedProcedure
    .input(ZInsertUploadFiletSchema)
    .mutation(async (opts) => {
      try {
        await db.insert(uploadFile).values({
          artUrl: opts.input.artUrl,
          alt: opts.input.alt,
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

  getAllUploadFiles: authedProcedure.query(async () => {
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
  getAllOrderedFiles: authedProcedure.query(async () => {
    try {
      const data = await db
        .select()
        .from(artOrder)
        .where(eq(artOrder.status, 'order'));
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
