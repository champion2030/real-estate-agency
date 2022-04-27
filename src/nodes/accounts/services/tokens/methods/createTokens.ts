import jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../../../../../global.config';
import { tokenModel } from '../token.model';
import { createHash } from '../../../utils/useragent';

export interface CreateTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CreateAccessTokenParams {
  accountId: string;
  os?: string;
  browser?: string;
  source?: string;
}

export const createAccessToken = (
  accountId: string,
  data: { os: string; browser: string; source: string },
) => {
  const hash = createHash(data);

  return jsonwebtoken.sign(
    {
      accountId,
      date: new Date().getTime(),
      useragent: hash,
    },
    jwt.secret,
    {
      expiresIn: jwt.accessExpires,
    },
  );
};

export const createTokens = async function (
  params: CreateAccessTokenParams,
): Promise<CreateTokensResponse> {
  const { accountId, os, browser, source } = params;

  const accessToken = createAccessToken(accountId, { os, browser, source });

  const refreshToken = jsonwebtoken.sign({ accountId, date: new Date().getTime() }, jwt.secret, {
    expiresIn: jwt.refreshExpires,
  });

  const count = await tokenModel.countDocuments({ accountId });

  if (count >= 10) {
    await tokenModel.findOneAndDelete({ accountId }, { sort: { createdAt: 1 } });
  }

  try {
    await tokenModel.create({
      accountId,
      os,
      browser,
      source,
      token: refreshToken,
    });
  } catch (err) {
    const { code } = err;
    const isDuplicateToken = code === 11000;

    if (!isDuplicateToken) {
      throw err;
    }
  }

  return {
    accessToken,
    refreshToken,
  };
};
