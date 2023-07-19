import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { bookFilterableFields, bookSearchableFields } from './book.constant';

const createBookController = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookService.createBook(book);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, bookSearchableFields);

    const result = await BookService.getAllBooks(filters, paginationOptions);

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const BookController = {
  createBookController,
  getAllBooksController,
};
