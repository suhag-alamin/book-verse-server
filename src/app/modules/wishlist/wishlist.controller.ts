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

const getWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await WishlistService.getWishlist();

    sendResponse<IWishlist[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Wishlist retrieved successfully',
      data: result,
    });
  },
);

const deleteWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WishlistService.deleteWishlist(id);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Wishlist deleted successfully',
      data: result,
    });
  },
);

export const WishlistController = {
  createWishlistController,
  getWishlistController,
  deleteWishlistController,
};
