import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signUpController = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthService.signUp(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User sign up Successfully',
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.login(loginData);

  const { refreshToken, ...OthersData } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: OthersData,
  });
});

export const AuthController = {
  signUpController,
  loginController,
};
