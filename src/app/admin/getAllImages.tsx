'use client';

import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';

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
              alt={file.alt}
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

export function getAllOrderedImages() {
  const orderedFiles = trpc.uploadFileRouter.getAllOrderedFiles.useQuery();
  if (orderedFiles.data) {
    return orderedFiles.data.map((orders) => {
      return (
        <div
          key={orders.id}
          className="flex h-64 w-44 border bg-gray-elevation-1"
        >
          <div className="relative h-36 grow">
            <Image
              src={orders.artUrl}
              alt={'some radom alt file'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      );
    });
  }
  return <div></div>;
}
