import { NextFunction, Request, Response } from 'express';
import auth from '../config/firebase-config';

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== undefined) {
    auth
      .verifyIdToken(token)
      .then((decodedIdToken) => {
        const { uid } = req.params;
        if (uid === decodedIdToken.uid) return next();
      })
      .catch((e) => {
        res.sendStatus(401);
      });
  } else res.sendStatus(500);
};
