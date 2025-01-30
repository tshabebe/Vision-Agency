import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '@/lib/trpc/client';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/provider/theme.provider';
import { ClientProviders } from '@/provider/react.aria.provider';

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
        <TRPCProvider>
          <ClientProviders>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              defaultTheme="light"
            >
              {children}
            </ThemeProvider>
          </ClientProviders>
        </TRPCProvider>
      </body>
    </html>
  );
}
