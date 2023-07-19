import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';

const addReviewController = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body;

  const result = await ReviewService.addReview(reviewData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

export const ReviewController = {
  addReviewController,
};
