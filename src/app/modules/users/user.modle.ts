import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.inerface';
import bcrypt from 'bcrypt';
import config from '../../config';

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
  password: {
    type: String,
    required: [true, 'Please enter your valid password'],
    select: false,
  },
  age: {
    type: Number,
    // required: [true, 'Please enter your age'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
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

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const User = mongoose.model<TUser>('User', userSchema);

export default User;
