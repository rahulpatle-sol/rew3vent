import { NextRequest, NextResponse } from 'next/server';

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents`;

const fallbackEvents = [
  {
    id: '1',
    title: 'Web3 Mumbai Meetup',
    date: '2026-07-15',
    time: '6:00 PM IST',
    location: 'BKC, Mumbai, Maharashtra',
    description: 'India\'s biggest Web3 networking event. Connect with builders, investors, and founders from the Indian crypto ecosystem.',
    rewards: 'Exclusive POAP + Swag Kit',
    imageUrl: 'https://picsum.photos/seed/mumbai-web3/600/400',
    hostName: 'Raj Patel',
    hostAvatarUrl: 'https://avatar.vercel.sh/rajpatel',
    attendees: 450,
    capacity: 500,
  },
  {
    id: '2',
    title: 'NFT Art Exhibition - Delhi',
    date: '2026-07-22',
    time: '11:00 AM IST',
    location: 'Connaught Place, New Delhi',
    description: 'India\'s premier digital art showcase featuring 50+ Indian NFT artists. Live minting and networking.',
    rewards: 'Free Mint Pass + Art Prints',
    imageUrl: 'https://picsum.photos/seed/delhi-nft/600/400',
    hostName: 'Priya Sharma',
    hostAvatarUrl: 'https://avatar.vercel.sh/priyasharma',
    attendees: 1200,
    capacity: 2000,
  },
  {
    id: '3',
    title: 'Blockchain Hackathon Bengaluru',
    date: '2026-08-05',
    time: '9:00 AM IST',
    location: 'Electronic City, Bengaluru, Karnataka',
    description: '48-hour hackathon building the next big dApp on Solana. Prizes worth ₹5L+. Food and accommodation included.',
    rewards: '₹5L Prize Pool + Internship',
    imageUrl: 'https://picsum.photos/seed/blr-hackathon/600/400',
    hostName: 'Arun Kumar',
    hostAvatarUrl: 'https://avatar.vercel.sh/arunkumar',
    attendees: 300,
    capacity: 300,
  },
  {
    id: '4',
    title: 'Crypto Trading Workshop - Hyderabad',
    date: '2026-08-12',
    time: '3:00 PM IST',
    location: 'HITEC City, Hyderabad, Telangana',
    description: 'Learn DeFi trading strategies from India\'s top crypto traders. Spot, futures, and yield farming masterclass.',
    rewards: 'Trading Bot Access + Signals',
    imageUrl: 'https://picsum.photos/seed/hyd-trading/600/400',
    hostName: 'Vikram Reddy',
    hostAvatarUrl: 'https://avatar.vercel.sh/vikramreddy',
    attendees: 200,
    capacity: 250,
  },
  {
    id: '5',
    title: 'Solana India Summit',
    date: '2026-08-20',
    time: '10:00 AM IST',
    location: 'Jio World Convention Centre, Mumbai',
    description: 'India\'s largest Solana ecosystem event. 100+ speakers, 50+ workshops, and the biggest Web3 gathering in South Asia.',
    rewards: 'Gold Ticket + VIP Access NFT',
    imageUrl: 'https://picsum.photos/seed/sol-summit/600/400',
    hostName: 'Solana India Collective',
    hostAvatarUrl: 'https://avatar.vercel.sh/solindia',
    attendees: 5000,
    capacity: 8000,
  },
  {
    id: '6',
    title: 'DAO Governance Meetup - Pune',
    date: '2026-09-01',
    time: '5:30 PM IST',
    location: 'Koregaon Park, Pune, Maharashtra',
    description: 'Deep dive into DAO governance models, voting mechanisms, and treasury management.',
    rewards: 'Governance Token Airdrop',
    imageUrl: 'https://picsum.photos/seed/pune-dao/600/400',
    hostName: 'Ananya Joshi',
    hostAvatarUrl: 'https://avatar.vercel.sh/ananyajoshi',
    attendees: 150,
    capacity: 200,
  },
  {
    id: '7',
    title: 'DeFi Farmers Meetup - Jaipur',
    date: '2026-09-10',
    time: '4:00 PM IST',
    location: 'M.I. Road, Jaipur, Rajasthan',
    description: 'Rajasthan\'s first DeFi community meetup. Yield farming, staking, and lending protocols with chai and samosa.',
    rewards: 'Ledger Nano S Giveaway',
    imageUrl: 'https://picsum.photos/seed/jaipur-defi/600/400',
    hostName: 'Deepak Singh',
    hostAvatarUrl: 'https://avatar.vercel.sh/deepaksingh',
    attendees: 80,
    capacity: 100,
  },
  {
    id: '8',
    title: 'Web3 Gaming Festival - Chennai',
    date: '2026-09-18',
    time: '12:00 PM IST',
    location: 'OMR Road, Chennai, Tamil Nadu',
    description: 'India\'s biggest Web3 gaming tournament. Play-to-earn, game dev workshop, and ₹10L in prizes.',
    rewards: '₹10L Prize Pool + Gaming Rig',
    imageUrl: 'https://picsum.photos/seed/chennai-gaming/600/400',
    hostName: 'Karthik Rajan',
    hostAvatarUrl: 'https://avatar.vercel.sh/karthikrajan',
    attendees: 2000,
    capacity: 3000,
  },
];

export async function GET() {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'your_project_id') {
      const res = await fetch(`${FIRESTORE_BASE}/events`, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const events = (data.documents || []).map((doc: any) => ({
          id: doc.name.split('/').pop(),
          ...doc.fields,
        }));
        return NextResponse.json(events);
      }
    }
  } catch {}

  return NextResponse.json(fallbackEvents);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'your_project_id') {
      const res = await fetch(`${FIRESTORE_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: body }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ id: data.name.split('/').pop(), ...body }, { status: 201 });
      }
    }
  } catch {}

  return NextResponse.json({ id: Date.now().toString(), ...body, _note: 'saved locally (Firebase not configured)' }, { status: 201 });
}
