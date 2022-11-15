import { Event, NewEvent, ProfileInfo, User } from './types';

// Localhost on web via ngrok
const baseUrl = 'https://3bdd-201-93-22-193.sa.ngrok.io';

async function fetchData<T>(
  route: string,
  options?: RequestInit,
  token?: string,
): Promise<T | void> {
  if (options) {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.mode = 'cors';
    options.cache = 'default';
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const res = await fetch(baseUrl + route, options);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getProfile(user: User) {
  const op: RequestInit = {
    method: 'GET',
  };
  return await fetchData<ProfileInfo>(`/profiles/${user.uid}`, op, user.token);
}

export async function patchProfileImage(user: User, imageUrl: string) {
  const op: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({ imageUrl }),
  };
  await fetchData(`/profiles/${user.uid}/image`, op, user.token);
}

export async function patchProfileName(user: User, name: string) {
  const op: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  };
  await fetchData(`/profiles/${user.uid}/name`, op, user.token);
}

export async function postUser(email: string | null, uid: string) {
  if (email != null) {
    const op: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ email, uid }),
    };
    await fetchData('/users', op);
  }
}

export async function postNewEvent(newEvent: NewEvent) {
  const op: RequestInit = {
    method: 'POST',
    body: JSON.stringify(newEvent),
  };
  await fetchData('/events', op);
}

export async function getEvent(eventId: string) {
  const op: RequestInit = {
    method: 'GET',
  };
  return await fetchData<Event>(`/events/${eventId}`, op);
}

export async function patchEventAttendees(
  eventId: string,
  attendees: Array<string>,
) {
  const op: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({ attendees }),
  };
  return await fetchData<Event>(`/events/${eventId}/attendees`, op);
}

export async function getEvents() {
  const op: RequestInit = {
    method: 'GET',
  };
  return await fetchData<Array<Event>>('/events', op);
}
