import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import authorizeUser from '../../middleware/authorizeUser';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBookController,
);

router.get('/', BookController.getAllBooksController);
router.get('/:id', BookController.getSingleBookController);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  authorizeUser,
  BookController.updateBookController,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  authorizeUser,
  BookController.deleteBookController,
);

export const BookRoutes = router;
