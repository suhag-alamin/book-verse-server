import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../enums/user';
import ApiError from '../../errors/ApiError';
import { Book } from '../modules/book/book.model';

const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const book = await Book.findById(id);

    if (user?.role === ENUM_USER_ROLE.ADMIN) {
      next();
    }

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
