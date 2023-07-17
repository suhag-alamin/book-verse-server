import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
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

export const AuthController = {
  signUpController,
};
