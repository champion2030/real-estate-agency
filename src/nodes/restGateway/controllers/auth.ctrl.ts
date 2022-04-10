import {Route, Tags, Controller, Post, Request, Body} from "tsoa";
import {MRequest} from "../app";
import {RegistrationPostData} from "./accounts.ctrl";
import {Account} from "../../accounts/services/accounts/account.type";

const AccountsService = require('../../accounts/services/accounts/accounts.service');

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {

  /**
   * @summary регистрация нового пользователя
   * @param req
   * @param account - данные аккаунта
   */
  @Post('/reg')
  async reg(@Request() req: MRequest,
            @Body() account: RegistrationPostData): Promise<Account> {
    return await AccountsService.accountRegistration(account);
  }
}
