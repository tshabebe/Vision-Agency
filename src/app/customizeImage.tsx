import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button, Separator } from 'react-aria-components';

export default function CustomizeImage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl uppercase tracking-widest md:text-3xl">
          print your own size(cm)
        </h2>
        <Separator className="w-10/12 bg-border" />
      </div>
      <Size />
    </div>
  );
}
const sizeOptions = [
  { id: 'small', print: 'P - 17 x 27', frame: 'F - 20 x 30' },
  { id: 'large', print: 'P - 72 X 147', frame: 'F - 75 x 150' },
  { id: 'medium', print: 'P - 57 x 87', frame: 'F - 60 x 90' },
];
function Size() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex items-center gap-2">
      {sizeOptions.map((option) => (
        <Button
          key={option.id}
          onPress={() => {
            router.push(pathname + '?' + createQueryString('size', option.id));
          }}
          className={cn(
            'flex flex-col bg-gray-elevation-3 p-4 outline focus:outline-green',
            option.id === 'large' && 'p-6',
            option.id === 'medium' && 'p-5',
            searchParams.get('size') === option.id && 'outline outline-green',
          )}
        >
          <span>{option.print}</span>
          <span>{option.frame}</span>
        </Button>
      ))}
    </div>
  );
}
