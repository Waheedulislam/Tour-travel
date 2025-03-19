import { TUser } from './user.inerface';
import User from './user.modle';

const createUser = async (payload: TUser) => {
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};
const getUser = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (id: string, payload: TUser) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
