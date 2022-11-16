import { Request, Response } from 'express';
import Event from '../models/Event';
import User from '../models/User';

export async function getAllEvents(req: Request, res: Response): Promise<void> {
  try {
    res.json(await Event.find().sort({ timestamp: 'asc' }));
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

export async function patchProfileImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { uid } = req.params;
    const user = await User.findOneAndUpdate(
      { uid },
      { profileImageUrl: req.body.imageUrl },
    );
    res.json({ profileImageUrl: user?.profileImageUrl, name: user?.name });
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function patchProfileName(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { uid } = req.params;
    const user = await User.findOneAndUpdate({ uid }, { name: req.body.name });
    res.json({ profileImageUrl: user?.profileImageUrl, name: user?.name });
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.create({
      email: req.body.email,
      uid: req.body.uid,
    });
    res.json({ email: user.email, uid: user.uid });
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postNewEvent(req: Request, res: Response): Promise<void> {
  try {
    const event = await Event.create({
      attendees: [],
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      timestamp: req.body.timestamp,
      location: req.body.location,
      creator: req.body.creator,
    });
    res.json({ id: event._id });
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function getEvent(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    res.json(event);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function patchEventAttendees(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndUpdate(
      { _id: id },
      { attendees: req.body.attendees },
    );
    res.json({ id: event?._id });
  } catch (e) {
    res.sendStatus(500);
  }
}
