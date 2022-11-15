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
    const user = await User.findOne({ uid });
    res.json({ profileImageUrl: user?.profileImageUrl, name: user?.name });
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postImageProfile(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { uid } = req.params;
    const user = await User.findOneAndUpdate(
      { uid },
      { profileImageUrl: req.body.imageUrl },
    );
    console.log(user);
    res.json({ profileImageUrl: user?.profileImageUrl, name: user?.name });
  } catch (e) {
    res.sendStatus(500);
  }
}
