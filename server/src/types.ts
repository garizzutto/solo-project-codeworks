export interface Event {
  imageUrl: string;
  title: string;
  description: string;
  attendees: string[];
  timestamp: string;
  location: string;
  creator: string;
  id: string;
}

export interface User {
  email: string;
  uid: string;
  profileImageUrl?: string;
}
