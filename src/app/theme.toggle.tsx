'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useId } from 'react';
import { Button, Switch } from 'react-aria-components';

export function SwitchToggle() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleSwitch = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={isDark ? 'checked' : 'unchecked'}
    >
      <Button
        id={`${id}-on`}
        className="flex-1 cursor-pointer text-left text-sm font-medium text-gray-text-secondary group-data-[state=unchecked]:text-gray-text-primary"
        aria-controls={id}
        onPress={() => {
          setTheme('light');
        }}
      >
        <Sun size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
      <div className="flex justify-center rounded-lg bg-gray-elevation-2">
        <Switch
          id={id}
          isSelected={isDark}
          onChange={toggleSwitch}
          aria-labelledby={`${id}-off ${id}-on`}
          aria-label="Toggle between dark and light mode"
          className="group flex items-center gap-2 text-lg font-semibold"
        >
          <div className="flex h-[26px] w-[44px] items-center rounded-full border bg-gray-elevation-1 p-[3px]">
            <span className="size-[20px] rounded-full bg-brown transition-all  group-data-[state=checked]:translate-x-[18px]"></span>
          </div>
        </Switch>
      </div>
      <Button
        id={`${id}-off`}
        className="flex-1 cursor-pointer text-right text-sm font-medium text-gray-text-secondary group-data-[state=checked]:text-gray-text-primary"
        aria-controls={id}
        onPress={() => {
          setTheme('dark');
        }}
      >
        <Moon size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
    </div>
  );
}
