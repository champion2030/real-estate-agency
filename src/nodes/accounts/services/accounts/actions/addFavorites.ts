import { AccountDoc, accountModel } from '../account.model';
import { ObjectId } from 'mongodb';

export const addFavorites = async (favoriteId: string, accountId: string): Promise<AccountDoc> => {
  return accountModel.findOneAndUpdate(
    { _id: new ObjectId(accountId) },
    { $addToSet: { favorites: favoriteId } },
    {
      new: true,
    },
  );
};
