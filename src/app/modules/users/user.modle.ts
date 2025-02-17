import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.inerface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(value);
      },
      message: '{value} is not a valid email',
    },
    immutable: true,
  },
  age: {
    type: Number,
    required: [true, 'Please enter your age'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: { values: ['user', 'admin'], methods: 'Please provide a valid role' },
    required: true,
    default: 'user',
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
    default: 'active',
  },
});

const User = mongoose.model<TUser>('User', userSchema);

export default User;
