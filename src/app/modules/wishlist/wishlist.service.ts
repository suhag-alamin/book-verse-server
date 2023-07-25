import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createWishlist = async (
  payload: IWishlist,
): Promise<IWishlist | null> => {
  const wishlist = await Wishlist.findOne({
    book: payload.book,
    user: payload.user,
  });
  if (wishlist) {
    return null;
  }

  const result = (
    await (await Wishlist.create(payload)).populate('book')
  ).populate('user');
  return result;
};

const getWishlist = async (): Promise<IWishlist[]> => {
  const result = await Wishlist.find().populate('book').populate('user');
  return result;
};

const deleteWishlist = async (id: string): Promise<IWishlist | null> => {
  const result = await Wishlist.findByIdAndDelete(id)
    .populate('book')
    .populate('user');
  return result;
};

export const WishlistService = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
