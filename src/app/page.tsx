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
import Link from 'next/link';
import { paths } from '@/config/paths';
import { SwitchToggle } from './theme.toggle';

export default async function CustomizePrint() {
  const isLoggedIn = await checkLoggedIn();
  return (
    <div className="container flex h-screen min-h-screen flex-col gap-4 transition-all">
      <div className="flex items-center justify-between">
        <Link href={paths.app.dashboard.getHref()} className="items-center">
          <h2 className="font-serif text-xl font-light md:text-2xl">KIKUNDI</h2>
        </Link>
        <h1 className="mx-auto font-serif text-4xl uppercase md:text-5xl">
          Make your custom
        </h1>
        {isLoggedIn ? (
          <AvatarPopover>
            <Suspense fallback={<div>U</div>}>
              <Avatar />
            </Suspense>
          </AvatarPopover>
        ) : (
          <div className={'flex gap-2'}>
            <SwitchToggle />
            <Button
              className={
                'border border-brown-elevation-4 bg-brown-elevation-2 px-2 py-1 text-brown-text-primary hover:bg-brown-elevation-2-hover hover:text-brown-text-primary-hover'
              }
            >
              <Link href={paths.auth.register.getHref()}>login</Link>
            </Button>
          </div>
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
