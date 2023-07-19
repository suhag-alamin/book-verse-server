import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from './auth.interface';
import { User } from './auth.model';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signUp = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // check user
  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // match password

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  // create access token and refresh token
  const { _id, email: userEmail } = isUserExist;

  const accessToken = JwtHelpers.createToken(
    { _id, email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.expiration as string,
  );

  const refreshToken = JwtHelpers.createToken(
    { _id, email: userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiration as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check deleted user
  const { email } = verifiedToken;

  const user = new User();
  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { _id, email: userEmail } = isUserExist;
  // generate new token
  const newAccessToken = JwtHelpers.createToken(
    { _id, email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.expiration as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signUp,
  login,
  refreshToken,
};
