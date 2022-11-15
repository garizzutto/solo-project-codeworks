import { Router, RequestHandler } from 'express';
import {
  getAllEvents,
  getProfile,
  patchProfileImage,
  patchProfileName,
  postUser,
  postNewEvent,
  getEvent,
  patchEventAttendees,
} from './controllers';
import { VerifyToken } from './middleware/VerifyToken';

const route = Router();

route.get('/events', getAllEvents as RequestHandler);
route.get('/profiles/:uid', VerifyToken, getProfile as RequestHandler);
route.patch(
  '/profiles/:uid/image',
  VerifyToken,
  patchProfileImage as RequestHandler,
);
route.patch(
  '/profiles/:uid/name',
  VerifyToken,
  patchProfileName as RequestHandler,
);
route.post('/users', postUser as RequestHandler);
route.post('/events', postNewEvent as RequestHandler);
route.get('/events/:id', getEvent as RequestHandler);
route.patch('/events/:id/attendees', patchEventAttendees as RequestHandler);

export default route;
