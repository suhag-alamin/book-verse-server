import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

const addReview = async (payload: IReview): Promise<IReview | null> => {
  // check if the book exist or not
  const isBookExist = await Book.findById(payload.book);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist!');
  }

  const result = (await Review.create(payload)).populate('book');
  return result;
};

export const ReviewService = {
  addReview,
};
