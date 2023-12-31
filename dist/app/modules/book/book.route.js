"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const authorizeUser_1 = __importDefault(require("../../middleware/authorizeUser"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBookController);
router.get('/', book_controller_1.BookController.getAllBooksController);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.getSingleBookController);
// get all books of a user
router.get('/user/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), book_controller_1.BookController.getAllBooksOfUserController);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), authorizeUser_1.default, book_controller_1.BookController.updateBookController);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), authorizeUser_1.default, book_controller_1.BookController.deleteBookController);
exports.BookRoutes = router;
