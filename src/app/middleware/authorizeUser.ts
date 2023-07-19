import { NextFunction, Request, Response } from 'express';
import { Book } from '../modules/book/book.model';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const book = await Book.findById(id);

    if (book?.author.toString() !== user?._id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to perform this action.',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeUser;
