import { serverClient } from '@/lib/trpc/serverClient';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const { userRole } = await serverClient.userRouter.getUser();
  if (userRole !== 'admin') {
    redirect('/');
  }
  return <div>Admin</div>;
}
