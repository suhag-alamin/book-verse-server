import { Schema, model } from 'mongoose';
import { IReadingList, ReadingListModel } from './readingList.interface';

const ReadingListSchema = new Schema<IReadingList, Record<string, unknown>>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

export const ReadingList = model<IReadingList, ReadingListModel>(
  'ReadingList',
  ReadingListSchema,
);
