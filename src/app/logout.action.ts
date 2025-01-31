'use server';

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from '@/auth/lucia';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  console.log('test');
  const { session } = await getCurrentSession();
  if (session === null) {
    return {
      message: 'Not authenticated',
    };
  }

  void invalidateSession(session.id);
  void deleteSessionTokenCookie();
  return redirect('/login');
}
