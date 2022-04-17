import { AccountDoc, accountModel } from '../account.model';
import { ACCOUNT_NOT_FOUND, BAD_LOGIN_OR_PASSWORD } from '../../../errorCodes.config';
import { checkPassword } from '../../../utils/password';
import { LogicError } from '../../../../../utils/LogicError';

export interface AuthenticateParams {
  phone: string;
  password: string;
}

export const authenticate = async (params: AuthenticateParams): Promise<AccountDoc> => {
  const { phone, password } = params;
  const account: AccountDoc = await accountModel.findOne({ phone }).exec();

  if (!account) {
    throw new LogicError(ACCOUNT_NOT_FOUND, account);
  }

  const result = await checkPassword(password, account.password);

  if (!result) {
    throw new LogicError(BAD_LOGIN_OR_PASSWORD);
  }

  return account;
};
