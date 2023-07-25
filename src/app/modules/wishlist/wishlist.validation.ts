import { z } from 'zod';

const createWishlistZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
});

export const WishlistValidation = {
  createWishlistZodSchema,
};
