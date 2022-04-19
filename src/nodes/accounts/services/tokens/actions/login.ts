import { AccountDoc } from '../../accounts/account.model';
import { createTokens, CreateTokensResponse } from '../methods/createTokens';
import { Account } from '../../accounts/account.type';
import { ROLES } from '../../../../../roles.config';
import { LogicError } from '../../../../../utils/LogicError';
import { ACCESS_DENIED } from '../../../errorCodes.config';

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
  isAdmin?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  account: Account;
}

const AccountsService = require('../../accounts/accounts.service');

export const login = async (params: LoginParams): Promise<CreateTokensResponse> => {
  const { phone, password, source, browser, os, isAdmin } = params;

  const { role, _id: accountId }: AccountDoc = await AccountsService.authenticate({
    password,
    phone,
  });

  if (isAdmin) {
    if (role !== ROLES.ADMIN) {
      throw new LogicError(ACCESS_DENIED);
    }
  }

  return createTokens({
    accountId,
    os,
    browser,
    source,
  });
};
