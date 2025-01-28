import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components';
import { trpc } from '@/lib/trpc/client';
import type { OrderArtInputForm } from '@/server/router/orderArt.schema';
import { ZOrderArtInputForm } from '@/server/router/orderArt.schema';
import { useSearchParams } from 'next/navigation';

function ConfirmOrder() {
  const form = useForm<OrderArtInputForm>({
    resolver: zodResolver(ZOrderArtInputForm),
    defaultValues: {
      contactInfo: 'test',
      name: 'testing',
    },
  });

  const searchParams = useSearchParams();
  const artUrl = searchParams.get('artUrl');
  const size = searchParams.get('size');
  const frame = searchParams.get('frame');

  const orderArt = trpc.orderArtRouter.orderArt.useMutation();
  function onSubmit(data: OrderArtInputForm) {
    if (!artUrl || !size || !frame) {
      alert('please select the art, frame and size');
      return;
    }
    orderArt.mutate({
      name: data.name,
      contactInfo: data.contactInfo,
      artUrl,
      size,
      frame,
    });
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex gap-2">
        <Controller
          control={form.control}
          name="name"
          render={({
            field: { ref, ...field },
            fieldState: { error, invalid },
          }) => (
            <TextField
              {...field}
              isInvalid={invalid}
              className={'flex grow flex-col'}
            >
              <Label>Name</Label>
              <Input
                className="-me-px flex-1 border bg-gray-elevation-2 px-3 py-1 placeholder:text-gray-text-tertiary focus:outline focus:outline-green focus-visible:z-10"
                placeholder="Your Name"
                ref={ref}
              />
              <FieldError className={'text-red-text-secondary'}>
                {error?.message}
              </FieldError>
            </TextField>
          )}
        />
        <Controller
          control={form.control}
          name="contactInfo"
          render={({
            field: { ref, ...field },
            fieldState: { error, invalid },
          }) => (
            <TextField
              {...field}
              isInvalid={invalid}
              className={'flex grow flex-col'}
            >
              <Label>Contact</Label>
              <Input
                className="-me-px flex-1 border bg-gray-elevation-2 px-3 py-1 placeholder:text-gray-text-tertiary focus:outline focus:outline-green focus-visible:z-10"
                placeholder="Contact Info"
                ref={ref}
              />
              <FieldError className={'text-red-text-secondary'}>
                {error?.message}
              </FieldError>
            </TextField>
          )}
        />
      </div>
      <Button
        type="submit"
        className={
          'bg-green px-4 py-2 text-lg font-semibold uppercase tracking-widest text-background focus:outline focus:outline-green'
        }
      >
        Order
      </Button>
    </form>
  );
}

export default ConfirmOrder;
