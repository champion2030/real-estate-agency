import { LogicError } from '../../../../../utils/LogicError';
import { AccountDoc, accountModel } from '../account.model';
import { ACCOUNT_NOT_FOUND } from '../../../errorCodes.config';

export const getByPhone = async (phone: string): Promise<AccountDoc> => {
  const account = await accountModel.findOne({ phone: phone }).exec();

  if (!account) {
    throw new LogicError(ACCOUNT_NOT_FOUND, { phone });
  }

  return account;
};
