import { Dancing_Script } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const calligraphy = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-calligraphy',
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;
