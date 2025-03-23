import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import User from '../app/modules/users/user.modle';
import config from '../app/config';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not Authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }
    // if (requiredRole && !requiredRole.includes) {
    //   throw new Error('You are not authorized');
    // }
    if (requiredRole.length > 0 && !requiredRole.includes(role)) {
      throw new Error('You are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
