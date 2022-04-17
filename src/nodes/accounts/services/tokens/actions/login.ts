import { AccountDoc } from '../../accounts/account.model';
import { createTokens, CreateTokensResponse } from '../methods/createTokens';
import { Account } from '../../accounts/account.type';

export interface LoginParams {
  phone: string;
  password: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  isBot?: boolean;
  browser?: string;
  version?: string;
  os?: string;
  platform?: string;
  source?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  account: Account;
}

const AccountsService = require('../../accounts/accounts.service');

export const login = async (params: LoginParams): Promise<CreateTokensResponse> => {
  const { phone, password, source, browser, os } = params;

  const account: AccountDoc = await AccountsService.authenticate({
    password,
    phone,
  });

  return createTokens({
    accountId: account._id,
    os,
    browser,
    source,
  });
};
