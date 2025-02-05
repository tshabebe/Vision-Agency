'use client';

import { trpc } from '@/lib/trpc/client';
import { UploadButton } from '@/lib/uploadthing.component';
import { twMerge } from 'tailwind-merge';

export default function UploadFile() {
  const utils = trpc.useUtils();
  const uploadFile = trpc.uploadFileRouter.uploadFile.useMutation({
    onSuccess: () => {
      void utils.uploadFileRouter.getAllUploadFiles.invalidate();
    },
  });
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={([res]) => {
        // Do something with the response
        console.log('Files: ', res);
        if (res) {
          uploadFile.mutate({
            artUrl: res.url,
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
          'ut-ready:bg-brown h-full basis-1/2 w-fit grow p-1  rounded-none ut-ready:text-background border-r ut-uploading:cursor-not-allowed rounded-r-none bg-background bg-none',
        container:
          'w-max flex-row rounded-none gap-0 bg-gray-elevation-2 border border-border',
        allowedContent: 'leading-none p-1 text-gray-text-primary',
      }}
    />
  );
}
