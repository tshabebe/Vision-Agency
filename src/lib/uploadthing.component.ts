import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';

import type { OurFileRouter } from './uploadthing';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
