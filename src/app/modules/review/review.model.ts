import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const reviewSchema = new Schema<IReview, Record<string, unknown>>(
  {
    review: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
