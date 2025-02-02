import CustomizeImage from './customizeImage';
import FrameSelection from './frameSection';
import ConfirmOrder from './confirmOrder';
import ChooseArt from './chooseArt';
import { checkLoggedIn } from '@/auth/auth';
import { serverClient } from '@/lib/trpc/serverClient';
import Image from 'next/image';
import { Suspense } from 'react';
import { AvatarPopover } from './avatar.popper';
import Button from './button.server';
import { redirect } from 'next/navigation';

export default async function CustomizePrint() {
  const isLoggedIn = await checkLoggedIn();
  return (
    <div className="container flex min-h-screen flex-col gap-4 transition-all">
      <div className="flex items-center justify-center">
        <h1 className="font-serif text-4xl uppercase md:text-5xl">
          Make your custom
        </h1>
        {isLoggedIn && (
          <AvatarPopover>
            <Suspense fallback={<div>U</div>}>
              <Avatar />
            </Suspense>
          </AvatarPopover>
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
  const { avatarUrl, name, userRole } = await serverClient.userRouter.getUser();
  if (!avatarUrl || !name) {
    return <div>U</div>;
  }
  if (userRole === 'admin') {
    redirect('/admin');
  }

  return (
    <div className=" flex items-center gap-2">
      <p className="hidden lg:block">{name}</p>
      <Button className={'rounded-full focus:outline focus:outline-brown'}>
        <Image
          src={avatarUrl}
          alt={name}
          width={28}
          height={28}
          className="ml-auto rounded-full"
        ></Image>
      </Button>
    </div>
  );
}
