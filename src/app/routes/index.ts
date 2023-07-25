import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { ReadingListRoutes } from '../modules/readingList/readingList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/reading-list',
    route: ReadingListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
