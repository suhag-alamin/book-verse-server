import { IReadingList } from './readingList.interface';
import { ReadingList } from './readingList.model';

const createReadingList = async (
  payload: IReadingList,
): Promise<IReadingList | null> => {
  const readingList = await ReadingList.findOne({
    book: payload.book,
    user: payload.user,
  });
  if (readingList) {
    return null;
  }

  const result = (
    await (await ReadingList.create(payload)).populate('book')
  ).populate('user');
  return result;
};

const getReadingList = async (): Promise<IReadingList[]> => {
  const result = await ReadingList.find().populate('book').populate('user');
  return result;
};

const updateReadingListStatus = async (
  id: string,
): Promise<IReadingList | null> => {
  const result = await ReadingList.findByIdAndUpdate(
    id,
    { isFinished: true },
    { new: true },
  )
    .populate('book')
    .populate('user');
  return result;
};

const deleteReadingList = async (id: string): Promise<IReadingList | null> => {
  const result = await ReadingList.findByIdAndDelete(id)
    .populate('book')
    .populate('user');
  return result;
};

export const ReadingListService = {
  createReadingList,
  getReadingList,
  updateReadingListStatus,
  deleteReadingList,
};
