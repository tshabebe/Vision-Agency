import { artOrder, ZInsertArtOrderSchema } from '@/db/schema';
import { authedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const orderArtRouter = router({
  orderArt: authedProcedure
    .input(ZInsertArtOrderSchema)
    .mutation(async (opts) => {
      try {
        await db.insert(artOrder).values({
          artUrl: opts.input.artUrl,
          name: opts.input.name,
          contactInfo: opts.input.contactInfo,
          frame: opts.input.frame,
          size: opts.input.size,
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not order your art',
          cause: error,
        });
      }
    }),
});
