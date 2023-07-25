import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReadingList } from './readingList.interface';
import { ReadingListService } from './readingList.service';

const createReadingListController = catchAsync(
  async (req: Request, res: Response) => {
    const readingList = req.body;
    const result = await ReadingListService.createReadingList(readingList);

    sendResponse<IReadingList>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reading List created successfully',
      data: result,
    });
  },
);

const getReadingListController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReadingListService.getReadingList();

    sendResponse<IReadingList[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reading List retrieved successfully',
      data: result,
    });
  },
);

export const ReadingListController = {
  createReadingListController,
  getReadingListController,
};
