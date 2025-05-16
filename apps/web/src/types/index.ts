export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rewards?: string;
  imageUrl?: string;
  hostName: string;
  hostAvatarUrl?: string;
  attendees?: number;
  capacity?: number;
}
