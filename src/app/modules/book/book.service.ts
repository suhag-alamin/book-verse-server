import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  if (!payload.image) {
    payload.image = 'https://i.ibb.co/4WHMwPj/book.jpg';
  }

  const result = await Book.create(payload);

  return result;
};

export const BookService = {
  createBook,
};
