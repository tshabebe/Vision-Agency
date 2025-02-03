import { serverClient } from '@/lib/trpc/serverClient';
import { redirect } from 'next/navigation';
import SearchInput from './upload.file';
import UploadFile from '../upload.ile';
import Button from '../button.server';
import { paths } from '@/config/paths';
import Link from 'next/link';
import { GetAllImages } from './getAllImages';

export default async function Admin() {
  const { userRole } = await serverClient.userRouter.getUser();
  if (userRole !== 'admin') {
    redirect('/');
  }
  return (
    <div className="container flex flex-col gap-8">
      <div className="flex justify-center gap-4 py-1">
        <SearchInput />
        <UploadFile />
        <Button
          className={
            'border border-brown bg-brown-elevation-1 px-4 text-brown-text-primary transition-colors hover:bg-brown-elevation-2 hover:text-brown-text-primary-hover'
          }
        >
          <Link href={paths.app.uploads.getHref()}> Uploads </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between border-b">
          <h2 className="px-10 text-2xl uppercase tracking-widest md:text-3xl">
            orders
          </h2>
          <SearchInput />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GetAllImages />
        </div>
      </div>
    </div>
  );
}
