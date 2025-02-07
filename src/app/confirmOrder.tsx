'use client';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function ConfirmOrder({ isLoggedIn }: { isLoggedIn: boolean }) {
  const form = useForm<OrderArtInputForm>({
    resolver: zodResolver(ZOrderArtInputForm),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const artId = searchParams.get('artId');
  const size = searchParams.get('size');
  const frame = searchParams.get('frame');

  const orderArt = trpc.orderArtRouter.orderArt.useMutation({
    onError: (error) => {
      form.setError('root', {
        type: 'server',
        message: error.message,
      });
    },
  });
  function onSubmit(data: OrderArtInputForm) {
    if (!isLoggedIn) {
      router.push(paths.auth.register.getHref());
      return;
    }

    if (!artId || !size || !frame) {
      form.setError('root', {
        type: 'server',
        message: 'please select the art, frame and size',
      });
      return;
    }
    orderArt.mutate({
      name: data.name,
      contactInfo: data.contactInfo,
      artId,
      size,
      frame,
    });
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex flex-col gap-2 lg:flex-row">
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
                className="-me-px flex-1 rounded-sm border bg-gray-elevation-2 px-3 py-1 placeholder:text-gray-text-tertiary focus:outline focus:outline-brown focus-visible:z-10"
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
                className="-me-px flex-1 rounded-sm border bg-gray-elevation-2 px-3 py-1 placeholder:text-gray-text-tertiary focus:outline focus:outline-brown focus-visible:z-10"
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
        isPending={orderArt.isPending}
        isDisabled={orderArt.isPending}
        className={
          'flex items-center justify-center gap-2 rounded-sm bg-brown px-4 py-2 text-lg font-semibold uppercase tracking-widest text-background pending:opacity-90 focus:outline focus:outline-brown'
        }
      >
        {orderArt.isPending && (
          <LoaderCircle size={16} strokeWidth={3} className="animate-spin" />
        )}
        Order
      </Button>
      <p
        className={cn(
          'text-red-text-secondary',
          orderArt.isSuccess && 'text-green-text-secondary',
        )}
      >
        {form.formState.errors.root ? form.formState.errors.root.message : ''}
        {orderArt.isSuccess && 'your order has been successful'}
      </p>
      <div>
        {!isLoggedIn && (
          <p>
            please{' '}
            <Link
              className="text-brown-text-secondary hover:text-brown-text-primary"
              href={paths.auth.register.getHref()}
            >
              login to your account
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default ConfirmOrder;
