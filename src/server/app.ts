import { orderArtRouter } from './router/orderArt.router';
import { uploadFileRouter } from './router/uploadfile.router';
import { userRouter } from './router/user.router';
import { router } from './trpc';

export const appRouter = router({
  userRouter,
  uploadFileRouter,
  orderArtRouter,
});

export type AppRouter = typeof appRouter;
