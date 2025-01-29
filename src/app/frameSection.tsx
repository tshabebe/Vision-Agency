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
              'h-10 w-32 border border-green-elevation-1-border bg-gradient-to-r from-gray-elevation-2 to-green-elevation-2 focus:outline focus:outline-green',
              searchParams.get('frame') === 'natural' &&
                'outline outline-green',
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
              'h-10 w-32 border border-gray-elevation-2-border focus:outline focus:outline-green',
              searchParams.get('frame') === 'black' && 'outline outline-green',
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
