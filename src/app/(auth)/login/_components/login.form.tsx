'use client';
import GoogleIcon from './google.icon';
import { Button, Link } from 'react-aria-components';
import { paths } from '@/config/paths';

export function LoginPageUI() {
  return (
    <div className="flex basis-72 flex-col items-center gap-6">
      <Greeting />
      <LoginForm />
    </div>
  );
}

function Greeting() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl uppercase tracking-widest md:text-3xl">
        Login to your account
      </h1>
      <div className="flex flex-col items-center">
        <h2 className="font-serif text-3xl font-light tracking-widest md:text-4xl">
          KIKUNDI
        </h2>
        <div className="flex gap-2 text-base font-extralight md:text-lg">
          <span>STORE</span>
          <div className="w-[2] bg-border" />
          <span>GALLERY</span>
          <div className="w-[2] bg-border" />
          <span>CAFE</span>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        className={
          'w-56 border bg-gray-elevation-1 px-4 py-2 hover:bg-gray-elevation-1-hover focus:outline focus:outline-brown [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
        }
      >
        <Link
          href={paths.auth.login.getHref()}
          className="flex items-center gap-2"
        >
          <GoogleIcon /> Login with Google
        </Link>
      </Button>
    </div>
  );
}
