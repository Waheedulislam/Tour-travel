import { TUser } from '../users/user.inerface';
import User from '../users/user.modle';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '1d',
  });

  const verifyUser = { name: user?.name, email: user?.email, role: user?.role };
  return { token, verifyUser };
};

export const AuthServices = {
  register,
  login,
};
