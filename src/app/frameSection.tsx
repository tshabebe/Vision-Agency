import { Button, Separator } from 'react-aria-components';

function FrameSelection() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="basis-10/12 text-2xl uppercase tracking-widest md:text-3xl">
          frame selection
        </h2>
        <Separator className="h-[2] w-full bg-gray-elevation-3" />
      </div>
      <div className="flex gap-6 lg:gap-10">
        <div className="flex flex-col gap-2">
          <Button
            className={
              'h-10 w-32 bg-gray-elevation-2 focus:outline focus:outline-green'
            }
          ></Button>
          <h3 className="text-2xl font-light uppercase tracking-widest md:text-3xl">
            Natural
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className={
              'h-10 w-32 bg-gray-elevation-2 focus:outline focus:outline-green'
            }
          ></Button>
          <h3 className="text-2xl font-light uppercase tracking-widest md:text-3xl">
            Black
          </h3>
        </div>
      </div>
    </div>
  );
}

export default FrameSelection;
