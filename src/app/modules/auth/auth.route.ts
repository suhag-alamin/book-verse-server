import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.sigUpUserZodSchema),
  AuthController.signUpController,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.loginController,
);

export const AuthRoutes = router;
