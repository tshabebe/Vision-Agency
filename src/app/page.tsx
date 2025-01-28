'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from 'react-aria-components';
import CustomizeImage from './customizeImage';
import FrameSelection from './frameSection';
import ConfirmOrder from './confirmOrder';

export default function CustomizePrint() {
  return (
    <div className="container flex min-h-screen flex-col gap-4">
      <h1 className="mx-auto font-serif text-4xl uppercase md:text-5xl">
        Make it custom
      </h1>
      <div className="flex grow flex-col gap-8 lg:flex-row">
        <ChooseArt />
        <div className="flex flex-col gap-8">
          <CustomizeImage />
          <FrameSelection />
          <ConfirmOrder />
        </div>
      </div>
    </div>
  );
}

// this could come from the db so make it come the db
const ArtOptions = [
  { id: '1', url: '/1.jpg', alt: `art 1 by teshome abebe` },
  { id: '2', url: '/2.jpg', alt: `art 2 by teshome abebe` },
  { id: '3', url: '/3.jpg', alt: `art 3 by teshome abebe` },
  { id: '4', url: '/3.jpg', alt: `art 3 by teshome abebe` },
];

function ChooseArt() {
  const [selectedArt, setSelectedArt] = useState<string>('4');
  return (
    <div className="flex grow flex-col gap-2">
      <h2 className="text-2xl uppercase tracking-widest md:text-3xl">
        choose your art
      </h2>
      <div className="flex w-full basis-32 gap-2">
        {ArtOptions.map((option) => (
          <Button
            key={option.id}
            onPress={() => {
              setSelectedArt(option.id);
            }}
            className={'relative w-full focus:outline focus:outline-green'}
          >
            <ArtPreview id={option.id} />
          </Button>
        ))}
      </div>
      <SelectedImage id={selectedArt} />
    </div>
  );
}

function ArtPreview({ id }: { id: string }) {
  return (
    <Image
      src={`/${id}.jpg`}
      alt={`art ${id} by teshome abebe`}
      fill
      className="object-cover"
    />
  );
}

function SelectedImage({ id }: { id: string }) {
  return (
    <div className="relative h-96 grow">
      <ArtPreview id={id} />
    </div>
  );
}
