'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from 'react-aria-components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { trpc } from '@/lib/trpc/client';

export default function ChooseArt() {
  const [selectedArt, setSelectedArt] = useState<string>('/4.jpg');
  const artOptions = trpc.uploadFileRouter.getAllUploadFiles.useQuery();
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
  if (!artOptions.data) {
    return;
  }

  return (
    <div className="flex grow flex-col gap-2">
      <h2 className="text-2xl uppercase tracking-widest md:text-3xl">
        choose your art
      </h2>
      <div className="flex grow flex-col gap-2 lg:flex-row">
        <div className="flex h-[560px] w-full basis-32 gap-2 overflow-auto lg:flex-col">
          {artOptions.data.map((option) => (
            <Button
              key={option.id}
              onPress={() => {
                setSelectedArt(option.artUrl);
                router.push(
                  pathname + '?' + createQueryString('artId', option.id),
                );
              }}
              className={cn(
                'relative size-36 shrink-0 focus:outline focus:outline-brown',
                searchParams.get('artId') === option.id &&
                  'outline outline-brown',
              )}
            >
              <ArtPreview src={option.artUrl} />
            </Button>
          ))}
        </div>
        <SelectedImage src={selectedArt} />
      </div>
    </div>
  );
}

function ArtPreview({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt={`art by teshome abebe`}
      fill
      className="object-cover"
    />
  );
}

function SelectedImage({ src }: { src: string }) {
  return (
    <div className="relative h-96 grow lg:h-full">
      <Image
        src={src}
        alt={`art  by teshome abebe`}
        fill
        className="object-contain"
      />
    </div>
  );
}
