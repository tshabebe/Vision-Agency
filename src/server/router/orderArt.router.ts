import { artOrder, uploadFile, ZInsertArtOrderSchema } from '@/db/schema';
import { authedProcedure, publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const orderArtRouter = router({
  orderArt: authedProcedure
    .input(ZInsertArtOrderSchema.omit({ userId: true }))
    .mutation(async (opts) => {
      try {
        await db.insert(artOrder).values({
          artId: opts.input.artId,
          name: opts.input.name,
          contactInfo: opts.input.contactInfo,
          frame: opts.input.frame,
          size: opts.input.size,
          userId: opts.ctx.user.id,
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not order your art',
          cause: error,
        });
      }
    }),
  GetSelectedImage: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const [selectedImage] = await db
        .select()
        .from(uploadFile)
        .where(eq(uploadFile.id, opts.input.id))
        .limit(1);
      return selectedImage;
    }),
});
