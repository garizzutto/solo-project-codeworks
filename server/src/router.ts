import { Router, Request, Response, RequestHandler } from 'express';
import { getAllEvents, getProfile } from './controllers';

const route = Router();

route.get('/events', getAllEvents as RequestHandler);
route.get('/profile/:uid', getProfile as RequestHandler);

export default route;
