import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import authorizeUser from '../../middleware/authorizeUser';
import validateRequest from '../../middleware/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBookController,
);

router.get('/', BookController.getAllBooksController);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookController.getSingleBookController,
);

// get all books of a user
router.get(
  '/user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookController.getAllBooksOfUserController,
);

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
