import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '@/config/env';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A utility function to get the base URL of the current instance.
 * @returns The base URL.
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (env.VERCEL_PROJECT_PRODUCTION_URL && env.VERCEL_ENV === 'production') {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // if (process.env['CODESPACE_NAME']) {
  //   return `https://${process.env['CODESPACE_NAME']}-3000.app.github.dev`;
  // }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return `http://localhost:${String(env.PORT)}`;
}

dayjs.extend(relativeTime);

export function formatRelativeTime(date: string | Date) {
  return dayjs(date).fromNow();
}
