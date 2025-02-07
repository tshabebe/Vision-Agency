'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button, Separator } from 'react-aria-components';

function FrameSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="px-4 text-2xl uppercase tracking-widest md:text-3xl">
          frame selection
        </h2>
        <Separator className="h-[2] w-full bg-gray-elevation-2" />
      </div>
      <div className="flex gap-6 lg:gap-10">
        <div className="flex flex-col gap-2">
          <Button
            onPress={() => {
              router.push(
                pathname + '?' + createQueryString('frame', 'natural'),
              );
            }}
            className={cn(
              'h-10 w-32 rounded-sm border border-brown-elevation-1-border bg-gradient-to-r from-gray-elevation-2 to-brown focus:outline focus:outline-brown',
              searchParams.get('frame') === 'natural' &&
                'outline outline-brown',
            )}
          ></Button>
          <h3 className="text-2xl font-light uppercase tracking-widest md:text-3xl">
            Natural
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onPress={() => {
              router.push(pathname + '?' + createQueryString('frame', 'black'));
            }}
            className={cn(
              'h-10 w-32 rounded-sm border border-gray-elevation-2-border bg-[#0f0c0b] focus:outline focus:outline-brown',
              searchParams.get('frame') === 'black' && 'outline outline-brown',
            )}
          ></Button>
          <h3 className="text-2xl font-light uppercase tracking-widest md:text-3xl">
            Black
          </h3>
        </div>
      </div>
    </div>
  );
}

export default FrameSelection;
