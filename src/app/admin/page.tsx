import { serverClient } from '@/lib/trpc/serverClient';
import { redirect } from 'next/navigation';
import SearchInput from './upload.file';
import Button from '../button.server';
import { paths } from '@/config/paths';
import Link from 'next/link';
import { ConfirmOrderedImages, GetAllOrderedImages } from './getAllImages';
import { SwitchToggle } from '../theme.toggle';

export default async function Admin() {
  const { userRole } = await serverClient.userRouter.getUser();
  if (userRole !== 'admin') {
    redirect('/');
  }
  return (
    <div className="container flex flex-col gap-8">
      <div className="flex items-center justify-center gap-4 py-1">
        <Link
          href={paths.app.dashboard.getHref()}
          className="flex flex-col items-center px-10"
        >
          <h2 className="font-serif text-3xl font-light tracking-widest md:text-4xl">
            KIKUNDI
          </h2>
          <div className="flex gap-2 text-base font-extralight md:text-lg">
            <span>STORE</span>
            <div className="w-[2] bg-border" />
            <span>GALLERY</span>
            <div className="w-[2] bg-border" />
            <span>CAFE</span>
          </div>
        </Link>
        <SearchInput />
        <Button
          className={
            'border border-brown bg-brown-elevation-1 px-4 py-1 text-brown-text-primary transition-colors hover:bg-brown-elevation-2 hover:text-brown-text-primary-hover'
          }
        >
          <Link href={paths.app.uploads.getHref()}> Uploads </Link>
        </Button>
        <SwitchToggle />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between border-b">
          <h2 className="px-10 text-2xl uppercase tracking-widest md:text-3xl">
            orders
          </h2>
        </div>
        <GetAllOrderedImages />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between border-b">
          <h2 className="px-10 text-2xl uppercase tracking-widest md:text-3xl">
            confirm
          </h2>
        </div>
        <ConfirmOrderedImages />
      </div>
    </div>
  );
}
