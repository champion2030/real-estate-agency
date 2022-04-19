import { Route, Tags, Controller, Post, Request, Body, Get, Path, Query } from 'tsoa';
import { MRequest } from '../app';
import { RegistrationPostData } from './accounts.ctrl';
import { Account } from '../../accounts/services/accounts/account.type';
import { LoginResponse } from '../../accounts/services/tokens/actions/login';
import { CheckTokenResponse } from '../../accounts/services/tokens/actions/checkToken';
import { CreateTokensResponse } from '../../accounts/services/tokens/methods/createTokens';

const AccountsService = require('../../accounts/services/accounts/accounts.service');
const TokenService = require('../../accounts/services/tokens/token.service');

export interface LoginModel {
  phone: string;
  password: string;
}

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  /**
   * @summary регистрация нового пользователя
   * @param req
   * @param account - данные аккаунта
   */
  @Post('/reg')
  async reg(@Request() req: MRequest, @Body() account: RegistrationPostData): Promise<Account> {
    return await AccountsService.accountRegistration(account);
  }

  /**
   * @summary аутентификация по логину (телефон) и паролю
   * @param req
   * @param model - данные для аутентификация
   */
  @Post('/login')
  async login(@Request() req: MRequest, @Body() model: LoginModel): Promise<LoginResponse> {
    const result: LoginResponse = await TokenService.login({
      ...model,
      ...req.useragent,
    });

    const account = await AccountsService.getByPhone(model.phone);

    this.setHeader('Set-Cookie', `accessToken=${result.accessToken}; Path=/`);
    result.account = account;

    return result;
  }

  /**
   * @summary проверить токен на валидность
   * @param token
   * @param req
   */
  @Get('/check/{token}')
  async checkToken(
    @Request() req: MRequest,
    @Path('token') token: string,
  ): Promise<CheckTokenResponse> {
    return await TokenService.checkToken(token);
  }

  /**
   * @summary обновить токены по refreshToken
   * @param req
   * @param token
   */
  @Get('/refresh/{token}')
  async refreshToken(
    @Request() req: MRequest,
    @Path('token') token: string,
  ): Promise<CreateTokensResponse> {
    return await TokenService.refreshTokens({ token, ...req.useragent });
  }

  /**
   * @summary аутентификация по логину (телефон) и паролю в админке
   * @param req
   * @param model
   */
  @Post('/login/admin')
  async loginAdmin(@Request() req: MRequest, @Body() model?: LoginModel): Promise<LoginResponse> {
    return await TokenService.login({
      ...model,
      ...req.useragent,
      isAdmin: true,
    });
  }

  /**
   * @summary выход из системы - уничтожается действующий refreshToken
   * @param token
   * @param req
   */
  @Get('/logout')
  async logout(@Request() req: MRequest, @Query('token') token?: string) {
    this.setHeader('Set-Cookie', `accessToken=null; Path=/`);

    if (token) {
      return await TokenService.logout({ token });
    }

    return { msg: 'OK' };
  }
}
