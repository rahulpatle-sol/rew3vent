import { NextRequest, NextResponse } from 'next/server';

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents`;

const fallbackEvents: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Web3 Mumbai Meetup',
    date: '2026-07-15',
    time: '6:00 PM IST',
    location: 'BKC, Mumbai, Maharashtra',
    description: 'India\'s biggest Web3 networking event. Connect with builders, investors, and founders from the Indian crypto ecosystem. This event features top speakers, networking sessions, and live demonstrations. Come join us for an evening of innovation and collaboration. Expect surprises and special guest appearances from leading Web3 founders.',
    rewards: 'Exclusive POAP + Swag Kit',
    imageUrl: 'https://picsum.photos/seed/mumbai-web3/1200/600',
    hostName: 'Raj Patel',
    hostAvatarUrl: 'https://avatar.vercel.sh/rajpatel?size=128',
    attendees: 450,
    capacity: 500,
  },
  '2': {
    id: '2',
    title: 'NFT Art Exhibition - Delhi',
    date: '2026-07-22',
    time: '11:00 AM IST',
    location: 'Connaught Place, New Delhi',
    description: 'India\'s premier digital art showcase featuring 50+ Indian NFT artists. Live minting, workshop, and networking. This hands-on exhibition will guide you through the world of digital art, covering tools, techniques, and market insights. No prior experience needed, just bring your curiosity!',
    rewards: 'Free Mint Pass + Art Prints',
    imageUrl: 'https://picsum.photos/seed/delhi-nft/1200/600',
    hostName: 'Priya Sharma',
    hostAvatarUrl: 'https://avatar.vercel.sh/priyasharma?size=128',
    attendees: 1200,
    capacity: 2000,
  },
  '3': {
    id: '3',
    title: 'Blockchain Hackathon Bengaluru',
    date: '2026-08-05',
    time: '9:00 AM IST',
    location: 'Electronic City, Bengaluru, Karnataka',
    description: '48-hour hackathon building the next big dApp on Solana. Prizes worth ₹5L+. Food and accommodation included. Teams of up to 4 people. Mentors from top Web3 companies will guide you throughout the event.',
    rewards: '₹5L Prize Pool + Internship Opportunities',
    imageUrl: 'https://picsum.photos/seed/blr-hackathon/1200/600',
    hostName: 'Arun Kumar',
    hostAvatarUrl: 'https://avatar.vercel.sh/arunkumar?size=128',
    attendees: 300,
    capacity: 300,
  },
  '4': {
    id: '4',
    title: 'Crypto Trading Workshop - Hyderabad',
    date: '2026-08-12',
    time: '3:00 PM IST',
    location: 'HITEC City, Hyderabad, Telangana',
    description: 'Learn DeFi trading strategies from India\'s top crypto traders. Spot, futures, and yield farming masterclass. Advanced techniques for experienced traders. Live trading sessions included.',
    rewards: 'Trading Bot Access + Signals',
    imageUrl: 'https://picsum.photos/seed/hyd-trading/1200/600',
    hostName: 'Vikram Reddy',
    hostAvatarUrl: 'https://avatar.vercel.sh/vikramreddy?size=128',
    attendees: 200,
    capacity: 250,
  },
  '5': {
    id: '5',
    title: 'Solana India Summit',
    date: '2026-08-20',
    time: '10:00 AM IST',
    location: 'Jio World Convention Centre, Mumbai',
    description: 'India\'s largest Solana ecosystem event. 100+ speakers, 50+ workshops, and the biggest Web3 gathering in South Asia. Multiple tracks covering DeFi, NFTs, gaming, and infrastructure.',
    rewards: 'Gold Ticket + VIP Access NFT',
    imageUrl: 'https://picsum.photos/seed/sol-summit/1200/600',
    hostName: 'Solana India Collective',
    hostAvatarUrl: 'https://avatar.vercel.sh/solindia?size=128',
    attendees: 5000,
    capacity: 8000,
  },
  '6': {
    id: '6',
    title: 'DAO Governance Meetup - Pune',
    date: '2026-09-01',
    time: '5:30 PM IST',
    location: 'Koregaon Park, Pune, Maharashtra',
    description: 'Deep dive into DAO governance models, voting mechanisms, and treasury management. Build the future of organizations with like-minded builders and thinkers.',
    rewards: 'Governance Token Airdrop',
    imageUrl: 'https://picsum.photos/seed/pune-dao/1200/600',
    hostName: 'Ananya Joshi',
    hostAvatarUrl: 'https://avatar.vercel.sh/ananyajoshi?size=128',
    attendees: 150,
    capacity: 200,
  },
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'your_project_id') {
      const res = await fetch(`${FIRESTORE_BASE}/events/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ id, ...data.fields });
      }
    }
  } catch {}

  const event = fallbackEvents[id] || null;
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(event);
}
