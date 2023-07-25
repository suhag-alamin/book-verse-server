'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReadingListValidation = void 0;
const zod_1 = require('zod');
const createReadingListZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    book: zod_1.z.string({
      required_error: 'Book is required',
    }),
  }),
});
exports.ReadingListValidation = {
  createReadingListZodSchema,
};
