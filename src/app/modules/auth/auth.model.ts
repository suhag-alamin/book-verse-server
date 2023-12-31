/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { role } from './auth.constant';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: role,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'> | null> {
  const user = await User.findOne(
    { email },
    {
      _id: 1,
      email: 1,
      password: 1,
      role: 1,
    },
  ).lean();
  return user;
};

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_slat_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
