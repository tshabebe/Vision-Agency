import CustomizeImage from './customizeImage';
import FrameSelection from './frameSection';
import ConfirmOrder from './confirmOrder';
import ChooseArt from './chooseArt';
import { checkLoggedIn } from '@/auth/auth';
import { serverClient } from '@/lib/trpc/serverClient';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function CustomizePrint() {
  const isLoggedIn = await checkLoggedIn();
  return (
    <div className="container flex min-h-screen flex-col gap-4">
      <div className="flex items-center justify-center">
        <h1 className="mx-auto font-serif text-4xl uppercase md:text-5xl">
          Make your custom
        </h1>
        {isLoggedIn && (
          <Suspense fallback={<div>TS</div>}>
            <Avatar />
          </Suspense>
        )}
      </div>
      <div className="flex grow flex-col gap-8 lg:flex-row">
        <ChooseArt />
        <div className="flex flex-col justify-center gap-8 px-4">
          <CustomizeImage />
          <FrameSelection />
          <ConfirmOrder isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
}

async function Avatar() {
  const { avatarUrl, name } = await serverClient.userRouter.getUser();
  if (!avatarUrl || !name) {
    return <div>TS</div>;
  }
  return (
    <div className="absolute right-0 top-0 flex items-center gap-2 px-4 py-3">
      <p>{name}</p>
      <Image
        src={avatarUrl}
        alt={name}
        width={28}
        height={28}
        className="ml-auto rounded-full"
      ></Image>
    </div>
  );
}
