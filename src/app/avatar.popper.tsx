'use client';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Popover, MenuTrigger, Menu, MenuItem } from 'react-aria-components';
import { Button } from 'react-aria-components';
import { logoutAction } from './logout.action';
import { SwitchToggle } from './theme.toggle';

export function AvatarPopover({ children }: { children: ReactNode }) {
  return (
    <MenuTrigger aria-labelledby="Landing Page Navigation">
      <div
        className={
          'group absolute right-0 top-0 mr-4 mt-3 text-gray-text-secondary'
        }
        aria-label="Menu"
      >
        {children}
      </div>
      <Popover
        className={
          'mr-4 overflow-hidden rounded-md border bg-background shadow-sm shadow-[#0C0909] entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95'
        }
      >
        <Menu className={'flex w-48 flex-col'}>
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
        <div className="flex items-center gap-2 p-2">
          <div>theme</div>
          <SwitchToggle />
        </div>
      </Popover>
    </MenuTrigger>
  );
}
