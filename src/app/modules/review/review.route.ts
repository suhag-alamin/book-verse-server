import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReviewController } from './review.cotroller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.addReviewController,
);

router.get('/:id', ReviewController.getAllReviewsController);

export const ReviewRoutes = router;
