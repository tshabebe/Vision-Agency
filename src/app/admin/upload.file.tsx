'use client';
import { Input } from 'react-aria-components';

export default function UploadFile() {
  return (
    <Input
      className={
        'self-center border bg-gray-elevation-2 p-1 placeholder:text-gray-text-tertiary'
      }
      placeholder="Name, Email, Phone"
    />
  );
}
