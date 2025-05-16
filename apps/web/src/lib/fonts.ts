import { Inter, Protest_Riot as ProtestRiotFont } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


export const protestRiot = ProtestRiotFont({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-protest-riot',
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;
