'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest'),
);
const wishlist_validation_1 = require('./wishlist.validation');
const wishlist_controller_1 = require('./wishlist.controller');
const auth_1 = __importDefault(require('../../middleware/auth'));
const user_1 = require('../../../enums/user');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequest_1.default)(
    wishlist_validation_1.WishlistValidation.createWishlistZodSchema,
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER),
  wishlist_controller_1.WishlistController.createWishlistController,
);
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER),
  wishlist_controller_1.WishlistController.getWishlistController,
);
exports.WishlistRoutes = router;
