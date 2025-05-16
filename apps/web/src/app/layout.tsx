
import type { Metadata } from 'next';
import { protestRiot, geistSans, geistMono } from '@/lib/fonts';
import './globals.css';
import { AppProviders } from './providers'; // Import the new provider wrapper

export const metadata: Metadata = {
  title: 'Rew3vent - Decentralized Events',
  description: 'Discover, create, and attend events on Rew3vent.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${protestRiot.variable} antialiased font-sans`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

