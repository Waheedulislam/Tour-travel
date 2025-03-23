import sendMail from '../../../utils/sendMail';
import config from '../../config';
import { TUser } from '../users/user.inerface';
import User from '../users/user.modle';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from './auth.utils';

const register = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found !!');
  }

  const userStatus = user?.userStatus;

  if (userStatus === 'inactive') {
    throw new Error('User is inactive!!');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new Error('Password is not valid. Please provide a valid email');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
  //   expiresIn: '1d',
  // });
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_refresh_in as string,
  );

  const verifyUser = { name: user?.name, email: user?.email, role: user?.role };

  return {
    accessToken,
    verifyUser,
    refreshToken,
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('User is not found ');
  }

  if (user?.userStatus === 'inactive') {
    throw new Error('User is blocked');
  }

  // jwt functionality
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1h' });

  const resetLink = `http://localhost:5173/reset-password?id=${user?._id}&token=${token}`;

  console.log(resetLink);

  await sendMail(user?.email, 'Reset your password!', resetLink);
};

const resetPassword = async (payload: {
  id: string;
  token: string;
  password: string;
}) => {
  const user = await User.findById(payload?.id);

  if (!user) {
    throw new Error('User is not found ');
  }

  if (user?.userStatus === 'inactive') {
    throw new Error('User is blocked');
  }

  jwt.verify(payload.token, 'secret', (err, decoded) => {
    if (err) {
      throw new Error('Invalid Token or expired token');
    }
  });

  // hash the password

  payload.password = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds),
  );

  user.password = payload?.password;

  const result = await User.findByIdAndUpdate(user?.id, user, { new: true });

  return result;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { email, role } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  register,
  login,
  forgetPassword,
  resetPassword,
  refreshToken,
};
