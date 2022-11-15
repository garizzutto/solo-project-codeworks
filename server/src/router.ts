import { Router, Request, Response, RequestHandler } from 'express';
import { getAllEvents, getProfile, postImageProfile } from './controllers';
import { VerifyToken } from './middleware/VerifyToken';

const route = Router();

route.get('/events', getAllEvents as RequestHandler);
route.get('/profile/:uid', VerifyToken, getProfile as RequestHandler);
route.post(
  '/profile/:uid/image',
  VerifyToken,
  postImageProfile as RequestHandler,
);

export default route;
