import { Schema, model } from 'mongoose';
import { IWishlist, WishlistModel } from './wishlist.interface';

const wishlistSchema = new Schema<IWishlist, Record<string, unknown>>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  wishlistSchema,
);
