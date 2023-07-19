import { z } from 'zod';

const addReviewZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Reference book is required',
    }),
    review: z.string({
      required_error: 'Review is required',
    }),
  }),
});

export const ReviewValidation = {
  addReviewZodSchema,
};
