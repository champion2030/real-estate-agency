import { MRequest } from '../app';
import { NextFunction, Response } from 'express';
import { LogicError } from '../../../utils/LogicError';
import { TOKEN_VERIFY_ERROR } from '../../accounts/errorCodes.config';
import { CheckTokenResponse } from '../../accounts/services/tokens/actions/checkToken';

const TokenService = require('../../accounts/services/tokens/token.service');

export const setAccountId = async (
  req: MRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token =
      req.body.accessToken ||
      req.query.access_token ||
      req.headers['x-access-token'] ||
      req.headers['Authorization'] ||
      req.headers['authorization'] ||
      req.cookies['accessToken'];

    if (!token) {
      throw new LogicError(TOKEN_VERIFY_ERROR, { token });
    }

    const tokenData: CheckTokenResponse = await TokenService.checkToken(token);

    if (typeof tokenData !== 'string') {
      req.accountId = tokenData.accountId;
    }
    next();
  } catch (e) {
    req.accountId = undefined;
    next();
  }
};
