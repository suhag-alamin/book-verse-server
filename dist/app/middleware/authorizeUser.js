'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_1 = __importDefault(require('http-status'));
const user_1 = require('../../enums/user');
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const book_model_1 = require('../modules/book/book.model');
const authorizeUser = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const user = req.user;
      const book = yield book_model_1.Book.findById(id);
      if (
        (user === null || user === void 0 ? void 0 : user.role) ===
        user_1.ENUM_USER_ROLE.ADMIN
      ) {
        next();
      }
      if (
        (book === null || book === void 0 ? void 0 : book.author.toString()) !==
        (user === null || user === void 0 ? void 0 : user._id)
      ) {
        throw new ApiError_1.default(
          http_status_1.default.UNAUTHORIZED,
          'You are not authorized to perform this action.',
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  });
exports.default = authorizeUser;
