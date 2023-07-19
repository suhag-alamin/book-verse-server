import { Model, Types } from 'mongoose';
import { IUser } from '../auth/auth.interface';

export type IBook = {
  title: string;
  author: Types.ObjectId | IUser;
  genre: string;
  publicationYear: string;
  image?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
