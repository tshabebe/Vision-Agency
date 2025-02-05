import { serverClient } from '@/lib/trpc/serverClient';
import { redirect } from 'next/navigation';
import UploadFile from '../upload.ile';
import SearchInput from '../admin/upload.file';
import { paths } from '@/config/paths';
import Link from 'next/link';
import { GetAllOrderedImages } from './getAllImages';
import { SwitchToggle } from '../theme.toggle';

export default async function uploads() {
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
        <UploadFile />
        <SwitchToggle />
      </div>
      <div className="flex flex-col gap-4">
        <GetAllOrderedImages />
      </div>
    </div>
  );
}
