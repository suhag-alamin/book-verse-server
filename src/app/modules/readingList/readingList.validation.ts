import { z } from 'zod';

const createReadingListZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
});

export const ReadingListValidation = {
  createReadingListZodSchema,
};
