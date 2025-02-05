'use client';

import { ZSelectArtOrderSchema } from '@/db/schema';
import { trpc } from '@/lib/trpc/client';
import { formatRelativeTime } from '@/lib/utils';
import { LoaderCircle, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from 'react-aria-components';
import type { z } from 'zod';

export function GetAllImages() {
  const uploadedFiles = trpc.uploadFileRouter.getAllUploadFiles.useQuery();
  if (uploadedFiles.data) {
    return uploadedFiles.data.map((file) => {
      return (
        <div
          key={file.id}
          className="flex h-64 w-44 border bg-gray-elevation-1"
        >
          <div className="relative h-36 grow">
            <Image
              src={file.artUrl}
              alt={file.description}
              fill
              className="object-cover"
            />
          </div>
        </div>
      );
    });
  }
  return <div>Loading...</div>;
}
function getSize(size: string) {
  if (size === 'small') {
    return { id: 'small', print: 'P - 17 x 27', frame: 'F - 20 x 30' };
  } else if (size === 'large') {
    return { id: 'large', print: 'P - 72 X 147', frame: 'F - 75 x 150' };
  } else {
    return { id: 'medium', print: 'P - 57 x 87', frame: 'F - 60 x 90' };
  }
}

export function GetAllOrderedImages() {
  const orderedFiles = trpc.uploadFileRouter.getAllOrderedFiles.useQuery({
    status: 'order',
  });
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
                src={artOrder.uploadFile.artUrl}
                alt={artOrder.uploadFile.description}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-1">
              <div className="text-center">
                <span>{artOrder.name}</span>
              </div>
              <div className="flex justify-between font-bold">
                <div className="">
                  <span>{getSize(artOrder.size).frame}</span>
                </div>
                <div className="">
                  <span>{getSize(artOrder.size).print}</span>
                </div>
              </div>
              <div className="">
                <span>{artOrder.frame}</span>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <span>{artOrder.contactInfo}</span>
                </div>
                <div className="text-xs text-brown-text-primary">
                  <span>{formatRelativeTime(artOrder.createdAt)}</span>
                </div>
              </div>
              <ChangeOrderStatus
                id={artOrder.id}
                status={{
                  status: 'confirm',
                }}
              />
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
  const { mutate, isPending } = trpc.uploadFileRouter.deleteOrder.useMutation({
    onSuccess: () => {
      void utils.uploadFileRouter.getAllOrderedFiles.invalidate();
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

function SetOrder({ orderId }: { orderId: string }) {
  const utils = trpc.useUtils();
  const { mutate, isPending } = trpc.uploadFileRouter.confirmOrder.useMutation({
    onSuccess: () => {
      void utils.uploadFileRouter.getAllOrderedFiles.invalidate();
    },
  });

  return (
    <div className="absolute right-0 top-0 mr-2 mt-1 flex items-center gap-2">
      <Button
        onPress={() => {
          mutate({ id: orderId, status: 'order' });
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
const _statusEnums = ZSelectArtOrderSchema.pick({ status: true });
type status = z.infer<typeof _statusEnums>;
function ChangeOrderStatus({ id, status }: { id: string; status: status }) {
  const utils = trpc.useUtils();
  const confirmOrder = trpc.uploadFileRouter.confirmOrder.useMutation({
    onSuccess: () => {
      void utils.uploadFileRouter.getAllOrderedFiles.invalidate();
    },
  });
  return (
    <Button
      className={'flex items-center gap-2 bg-brown text-background'}
      onPress={() => {
        confirmOrder.mutate({
          id: id,
          status: status.status,
        });
      }}
    >
      {confirmOrder.isPending && (
        <LoaderCircle size={16} strokeWidth={3} className="animate-spin" />
      )}
      deliver
    </Button>
  );
}

export function ConfirmOrderedImages() {
  const orderedFiles = trpc.uploadFileRouter.getAllOrderedFiles.useQuery({
    status: 'confirm',
  });
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
                src={artOrder.uploadFile.artUrl}
                alt={artOrder.uploadFile.description}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-1">
              <div className="text-center">
                <span>{artOrder.name}</span>
              </div>
              <div className="flex justify-between font-bold">
                <div className="">
                  <span>{getSize(artOrder.size).frame}</span>
                </div>
                <div className="">
                  <span>{getSize(artOrder.size).print}</span>
                </div>
              </div>
              <div className="">
                <span>{artOrder.frame}</span>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <span>{artOrder.contactInfo}</span>
                </div>
                <div className="text-xs text-brown-text-primary">
                  <span>{formatRelativeTime(artOrder.createdAt)}</span>
                </div>
              </div>
              <ChangeOrderStatus
                id={artOrder.id}
                status={{
                  status: 'delivered',
                }}
              />
            </div>
            <SetOrder orderId={artOrder.id} />
          </div>
        ))}
      </div>
    );
  }
  return <div>loading...</div>;
}
