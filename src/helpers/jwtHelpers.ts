import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

const createToken = (
  payload: { _id: ObjectId; email: string; role: string },
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
