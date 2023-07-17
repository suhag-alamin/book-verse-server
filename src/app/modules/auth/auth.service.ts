import { IUser } from './auth.interface';
import { User } from './auth.model';

const signUp = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

export const AuthService = {
  signUp,
};
