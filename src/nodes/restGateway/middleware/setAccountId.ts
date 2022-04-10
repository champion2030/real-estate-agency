import { MRequest } from '../app';
import { NextFunction, Response } from 'express';
import { LogicError } from "../../../utils/LogicError";
import { TOKEN_VERIFY_ERROR } from "../../accounts/errorCodes.config";

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

    // const tokenData: CheckTokenResponse = await req.ctx.call('tokens.checkToken', {
    //   token,
    //   ...req.useragent,
    // });

    // добавляем в request accountId для использования в роутах
    // if (typeof tokenData !== 'string') {
    //   req.accountId = tokenData.accountId;
    //
    //   const account: AccountDoc = await req.ctx.call('accounts.get', { id: tokenData.accountId });
    //
    //   req.ctx.meta = { ...req.ctx.meta, accountId: tokenData.accountId, account };
    // }
    next();
  } catch (e) {
    req.accountId = undefined;
    next();
  }
};
