import { z } from 'zod';

const sigUpUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const loginUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({}).optional(),
      lastName: z.string({}).optional(),
    }),
    email: z.string({}).email().optional(),
    password: z.string({}).optional(),
  }),
});

export const AuthValidation = {
  sigUpUserZodSchema,
  loginUserZodSchema,
};
