
import type { Metadata } from 'next';
import { calligraphy, geistSans, geistMono } from '@/lib/fonts';
import './globals.css';
import { AppProviders } from './providers'; // Import the new provider wrapper

export const metadata: Metadata = {
  title: 'Rew3vent - India ka Decentralized Events Platform',
  description: 'Discover, create, and attend events across India. From Mumbai to Delhi, Bangalore to Kolkata - Web3 events in your city.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${calligraphy.variable} antialiased font-sans`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

