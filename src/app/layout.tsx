import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '@/lib/trpc/client';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/provider/theme.provider';
import { ClientProviders } from '@/provider/react.aria.provider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/lib/uploadthing';

export const metadata: Metadata = {
  title: 'Vision Agency',
  description: 'Vision Agency Art Gallery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TRPCProvider>
          <ClientProviders>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              defaultTheme="dark"
            >
              {children}
            </ThemeProvider>
          </ClientProviders>
        </TRPCProvider>
      </body>
    </html>
  );
}
