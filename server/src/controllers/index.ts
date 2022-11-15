import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';

export async function getAllEvents(req: Request, res: Response): Promise<void> {
  try {
    res.json(await User.find());
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const { uid } = req.params;
    console.log(uid);
    res.json(await User.find({ uid }));
  } catch (e) {
    res.sendStatus(500);
  }
}
