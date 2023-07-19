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

const getSingleBookController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.getSingleBook(id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  },
);

const updateBookController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBookController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await BookService.deleteBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
  });
});

export const BookController = {
  createBookController,
  getAllBooksController,
  getSingleBookController,
  updateBookController,
  deleteBookController,
};
