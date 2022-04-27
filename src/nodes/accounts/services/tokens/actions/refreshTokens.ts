import { isNil } from 'lodash';
import jsonwebtoken from 'jsonwebtoken';
import {
  EMPTY_TOKEN,
  REFRESH_TOKEN_EXPIRED,
  INVALID_REFRESH_TOKEN,
  TOKEN_VERIFY_ERROR,
  ACCOUNT_NOT_FOUND,
} from '../../../errorCodes.config';
import { createTokens, CreateTokensResponse } from '../methods/createTokens';
import { TokenDoc, tokenModel } from '../token.model';
import { jwt } from '../../../../../global.config';
import { LogicError } from '../../../../../utils/LogicError';

interface RefreshTokensParams {
  token: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  isBot?: boolean;
  browser?: string;
  version?: string;
  os?: string;
  platform?: string;
  source?: string;
}

export const refreshTokens = async function (
  params: RefreshTokensParams,
): Promise<CreateTokensResponse> {
  const { token, browser, os, source } = params;

  if (isNil(token)) {
    throw new LogicError(EMPTY_TOKEN);
  }

  let tokenData: any;

  try {
    tokenData = jsonwebtoken.verify(token, jwt.secret);
  } catch (err) {
    if (err?.message === 'jwt expired') {
      throw new LogicError(REFRESH_TOKEN_EXPIRED);
    }
    if (err) {
      throw new LogicError(TOKEN_VERIFY_ERROR, {
        message: err.message,
      });
    }
  }

  if (!tokenData) {
    throw new LogicError(TOKEN_VERIFY_ERROR);
  }

  const { accountId } = tokenData;

  if (isNil(accountId)) {
    throw new LogicError(ACCOUNT_NOT_FOUND, { accountId });
  }

  const foundRefreshToken: TokenDoc = await tokenModel.findOne({
    accountId,
    token,
  });

  if (!foundRefreshToken) {
    throw new LogicError(REFRESH_TOKEN_EXPIRED);
  }

  if (token === foundRefreshToken.token) {
    const tokens: CreateTokensResponse = await createTokens({
      accountId,
      os,
      browser,
      source,
    });

    await tokenModel.deleteOne({ token: foundRefreshToken.token, accountId });

    return tokens;
  }

  throw new LogicError(INVALID_REFRESH_TOKEN);
};
