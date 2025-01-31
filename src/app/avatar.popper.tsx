'use client';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Popover, MenuTrigger, Menu, MenuItem } from 'react-aria-components';
import { Button } from 'react-aria-components';
import { logoutAction } from './logout.action';

export function AvatarPopover({ children }: { children: ReactNode }) {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  return (
    <MenuTrigger
      aria-labelledby="Landing Page Navigation"
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <Button
        className={
          'group absolute right-0 top-0 mr-4 mt-3 text-gray-text-secondary'
        }
        aria-expanded={IsOpen}
        aria-label="Menu"
      >
        {children}
      </Button>
      <Popover
        className={
          'bg-background shadow-md shadow-[#0C0909] entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95'
        }
      >
        <Menu
          className={'flex w-48 flex-col overflow-hidden rounded-md border'}
        >
          <MenuItem
            className={({ isFocused }) =>
              cn(
                'cursor-pointer p-2 outline-none',
                isFocused && 'bg-gray-elevation-1-hover',
              )
            }
            onAction={async () => {
              await logoutAction();
            }}
          >
            <Button>Logout</Button>
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
