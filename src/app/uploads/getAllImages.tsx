'use client';
import { trpc } from '@/lib/trpc/client';
import { formatRelativeTime } from '@/lib/utils';
import { LoaderCircle, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from 'react-aria-components';

export function GetAllOrderedImages() {
  const orderedFiles = trpc.uploadFileRouter.getAllUploadFiles.useQuery();
  if (orderedFiles.data) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {orderedFiles.data.map((artOrder) => (
          <div
            key={artOrder.id}
            className="relative flex h-64 w-44 flex-col border bg-gray-elevation-1"
          >
            <div className="relative h-36 w-44">
              <Image
                src={artOrder.artUrl}
                alt={artOrder.description}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-1">
              <div className="text-center">
                <span>{artOrder.description}</span>
              </div>
              <div className="flex">
                <div className="text-xs text-brown-text-primary">
                  <span>{formatRelativeTime(artOrder.createdAt)}</span>
                </div>
              </div>
            </div>
            <DeleteOrder orderId={artOrder.id} />
          </div>
        ))}
      </div>
    );
  }
  return <div>loading...</div>;
}
function DeleteOrder({ orderId }: { orderId: string }) {
  const utils = trpc.useUtils();
  const { mutate, isPending } = trpc.uploadFileRouter.deleteImage.useMutation({
    onSuccess: () => {
      void utils.uploadFileRouter.getAllUploadFiles.invalidate();
    },
  });

  return (
    <div className="absolute right-0 top-0 mr-2 mt-1 flex items-center gap-2">
      <Button
        onPress={() => {
          mutate({ id: orderId });
        }}
        isDisabled={isPending}
        className="rounded border border-border/50 bg-gray-elevation-2/50 px-2 py-1 transition-all hover:border-red-elevation-2-border-hover hover:bg-red-elevation-2 hover:text-red-text-primary"
      >
        {isPending ? (
          <LoaderCircle size={16} strokeWidth={3} className="animate-spin" />
        ) : (
          <TrashIcon size={16} strokeWidth={3} />
        )}
      </Button>
    </div>
  );
}
