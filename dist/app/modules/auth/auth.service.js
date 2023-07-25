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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const auth_model_1 = require('./auth.model');
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const config_1 = __importDefault(require('../../../config'));
const signUp = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.create(user);
    return result;
  });
const login = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check user
    const user = new auth_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist',
      );
    }
    // match password
    if (
      isUserExist.password &&
      !(yield user.isPasswordMatch(password, isUserExist.password))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password does not match',
      );
    }
    // create access token and refresh token
    const { _id, email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers_1.JwtHelpers.createToken(
      { _id, email: userEmail, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expiration,
    );
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken(
      { _id, email: userEmail, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expiration,
    );
    return {
      accessToken,
      refreshToken,
    };
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.JwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret,
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid refresh token',
      );
    }
    // check deleted user
    const { email } = verifiedToken;
    const user = new auth_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist',
      );
    }
    const { _id, email: userEmail, role } = isUserExist;
    // generate new token
    const newAccessToken = jwtHelpers_1.JwtHelpers.createToken(
      { _id, email: userEmail, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expiration,
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  signUp,
  login,
  refreshToken,
};
