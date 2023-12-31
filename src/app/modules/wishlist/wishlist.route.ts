import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { WishlistValidation } from './wishlist.validation';
import { WishlistController } from './wishlist.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(WishlistValidation.createWishlistZodSchema),
  auth(ENUM_USER_ROLE.USER),
  WishlistController.createWishlistController,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.getWishlistController,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.deleteWishlistController,
);

export const WishlistRoutes = router;
