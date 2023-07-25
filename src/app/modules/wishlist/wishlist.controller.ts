import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IWishlist } from './wishlist.interface';
import httpStatus from 'http-status';
import { WishlistService } from './wishlist.service';

const createWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const wishlist = req.body;
    const result = await WishlistService.createWishlist(wishlist);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Wishlist created successfully',
      data: result,
    });
  },
);

export const WishlistController = {
  createWishlistController,
};
