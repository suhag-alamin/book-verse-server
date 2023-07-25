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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelpers_1 = require('../../../helpers/paginationHelpers');
const book_constant_1 = require('./book.constant');
const book_model_1 = require('./book.model');
const createBook = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.image) {
      payload.image = 'https://i.ibb.co/4WHMwPj/book.jpg';
    }
    const result = yield book_model_1.Book.create(payload);
    return result;
  });
const getAllBooks = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: book_constant_1.bookSearchableFields.map(filed => ({
          [filed]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.PaginationHelpers.calculatePagination(
        paginationOptions,
      );
    const sortCondition = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield book_model_1.Book.find(whereCondition)
      .populate('author')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = yield book_model_1.Book.countDocuments(whereCondition);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate('author');
    return result;
  });
const updateBook = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById(id);
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book not found',
      );
    }
    const result = yield book_model_1.Book.findByIdAndUpdate(id, payload, {
      new: true,
    }).populate('author');
    return result;
  });
const deleteBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.findByIdAndDelete(id);
  });
exports.BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
