'use client';

import { trpc } from '@/lib/trpc/client';
import { UploadButton } from '@/lib/uploadthing.component';
import { twMerge } from 'tailwind-merge';

export default function UploadFile() {
  const uploadFile = trpc.uploadFileRouter.uploadFile.useMutation();
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={([res]) => {
        // Do something with the response
        console.log('Files: ', res);
        if (res) {
          uploadFile.mutate({
            artUrl: res.url,
            alt: 'this is something nice',
            description: 'this is the description',
          });
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      config={{ cn: twMerge }}
      appearance={{
        button:
          'ut-ready:bg-brown ut-ready:text-background border-r ut-uploading:cursor-not-allowed rounded-r-none bg-background bg-none',
        container:
          'w-max flex-row rounded-md border-cyan-300 bg-gray-elevation-2 border border-border',
        allowedContent:
          'flex h-8 flex-col items-center justify-center px-2 text-foreground',
      }}
    />
  );
}
