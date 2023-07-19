/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

export type IUser = {
  _id: ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password'> | null>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  refreshToken: string;
};
