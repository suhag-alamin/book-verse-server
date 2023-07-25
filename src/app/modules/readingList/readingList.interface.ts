import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../auth/auth.interface';

export type IReadingList = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  isFinished: boolean;
};

export type ReadingListModel = Model<IReadingList, Record<string, unknown>>;
