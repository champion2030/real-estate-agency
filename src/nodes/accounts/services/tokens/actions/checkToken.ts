import jsonwebtoken from 'jsonwebtoken';
import { LogicError } from '../../../../../utils/LogicError';
import { jwt } from '../../../../../global.config';
import { INVALID_TOKEN } from '../../../errorCodes.config';

export type CheckTokenResponse = { accountId: string; [key: string]: any } | string;

export const checkToken = async function (token: string): Promise<CheckTokenResponse> {
  let tokenData: any;

  try {
    tokenData = jsonwebtoken.verify(token, jwt.secret);
  } catch (e) {
    throw new LogicError(INVALID_TOKEN);
  }

  return tokenData;
};
