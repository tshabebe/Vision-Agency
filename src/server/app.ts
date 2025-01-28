import { orderArtRouter } from './router/orderArt.router';
import { userRouter } from './router/user.router';
import { router } from './trpc';

export const appRouter = router({
  userRouter,
  orderArtRouter,
});

export type AppRouter = typeof appRouter;
