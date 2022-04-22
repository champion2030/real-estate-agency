import { AccountDoc, accountModel } from '../account.model';
import { ObjectId } from 'mongodb';

export const rmFavorites = async (favoriteId: string, accountId: string): Promise<AccountDoc> => {
  return accountModel.findOneAndUpdate(
    { _id: new ObjectId(accountId) },
    { $pull: { favorites: favoriteId } },
    {
      new: true,
    },
  );
};
