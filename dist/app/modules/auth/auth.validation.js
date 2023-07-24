'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const zod_1 = require('zod');
const auth_constant_1 = require('./auth.constant');
const sigUpUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'First name is required',
      }),
      lastName: zod_1.z.string({
        required_error: 'Last name is required',
      }),
    }),
    email: zod_1.z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
    role: zod_1.z.enum([...auth_constant_1.role]).optional(),
  }),
});
const loginUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = zod_1.z.object({
  cookies: zod_1.z.object({
    refreshToken: zod_1.z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});
exports.AuthValidation = {
  sigUpUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
