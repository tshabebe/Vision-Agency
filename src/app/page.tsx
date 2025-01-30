import CustomizeImage from './customizeImage';
import FrameSelection from './frameSection';
import ConfirmOrder from './confirmOrder';
import ChooseArt from './chooseArt';
import { checkLoggedIn } from '@/auth/auth';

export default async function CustomizePrint() {
  const isLoggedIn = await checkLoggedIn();
  return (
    <div className="container flex min-h-screen flex-col gap-4">
      <h1 className="mx-auto font-serif text-4xl uppercase md:text-5xl">
        Make your custom
      </h1>
      <div className="flex grow flex-col gap-8 lg:flex-row">
        <ChooseArt />
        <div className="flex flex-col justify-center gap-8 px-4">
          <CustomizeImage />
          <FrameSelection />
          <ConfirmOrder isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
}
