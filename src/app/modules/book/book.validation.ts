import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.string({
      required_error: 'Publication Year is required',
    }),
    image: z.string({}).optional(),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    genre: z.string({}).optional(),
    publicationYear: z.string({}).optional(),
    image: z.string({}).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
