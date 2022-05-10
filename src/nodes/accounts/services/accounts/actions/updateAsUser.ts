import { LogicError } from '../../../../../utils/LogicError';
import { AccountDoc, accountModel } from '../account.model';
import { ACCOUNT_NOT_FOUND } from '../../../errorCodes.config';
import { ObjectId } from 'mongodb';
import { AccountInfo } from '../account.type';

export const updateAsUser = async (params: AccountInfo, accountId: string): Promise<AccountDoc> => {
  const account = await accountModel.findById(accountId).exec();

  if (!account) {
    throw new LogicError(ACCOUNT_NOT_FOUND, { accountId });
  }

  return accountModel.findOneAndUpdate({ _id: new ObjectId(accountId) }, params, {
    new: true,
  });
};
