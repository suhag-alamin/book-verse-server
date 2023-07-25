import express from 'express';
import validateRequest from '../../middleware/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import { ReadingListController } from './readingList.controller';
import { ReadingListValidation } from './readingList.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReadingListValidation.createReadingListZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.createReadingListController,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.getReadingListController,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.updateReadingListStatusController,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.deleteReadingListController,
);

export const ReadingListRoutes = router;
