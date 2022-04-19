import jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../../../../../global.config';
import { tokenModel } from '../token.model';

interface LogoutParams {
  token: string;
}

export const logout = async (params: LogoutParams): Promise<{ msg: 'OK' }> => {
  const { token } = params;

  const tokenData: any = jsonwebtoken.verify(token, jwt.secret);

  await tokenModel.deleteOne({ accountId: tokenData.accountId, token });

  return { msg: 'OK' };
};
