"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const addReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({
            required_error: 'Reference book is required',
        }),
        review: zod_1.z.string({
            required_error: 'Review is required',
        }),
    }),
});
exports.ReviewValidation = {
    addReviewZodSchema,
};
