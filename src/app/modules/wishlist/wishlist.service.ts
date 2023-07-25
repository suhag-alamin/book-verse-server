import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createWishlist = async (
  payload: IWishlist,
): Promise<IWishlist | null> => {
  const result = (
    await (await Wishlist.create(payload)).populate('book')
  ).populate('user');
  return result;
};

export const WishlistService = {
  createWishlist,
};
