import { ProfileInfo, User } from './types';

// Localhost on web via ngrok
const baseUrl = 'https://3bdd-201-93-22-193.sa.ngrok.io';

async function fetchData<T>(route: string, options?: RequestInit): Promise<T> {
  const res = await fetch(baseUrl + route, options);
  return await res.json();
}

export async function getProfile(user: User) {
  const op: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    mode: 'cors',
    cache: 'default',
  };
  const profile = await fetchData<ProfileInfo>(`/profile/${user.uid}`, op);
  console.log('Get Profile', profile);
  return profile;
}

export async function postProfileImage(user: User, imageUrl: string) {
  const op: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ imageUrl }),
    mode: 'cors',
    cache: 'default',
  };
  const profile = await fetchData<ProfileInfo>(
    `/profile/${user.uid}/image`,
    op,
  );
  console.log('Post Profile', profile);
  return profile;
}
