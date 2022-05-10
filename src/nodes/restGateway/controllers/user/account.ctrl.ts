import { Controller, Route, Tags, Request, Get, Security, Put, Body, Path, Delete } from 'tsoa';
import { MRequest } from '../../app';
import { Account, AccountInfo } from '../../../accounts/services/accounts/account.type';

const AccountsService = require('../../../accounts/services/accounts/accounts.service');

@Route('user')
@Tags('User')
export class AccountInfoController extends Controller {
  /**
   * @summary показать основные данные об аккаунте
   */
  @Get('/info')
  @Security('jwt', ['user:readAny'])
  async accountInfo(@Request() req: MRequest): Promise<Account> {
    return await AccountsService.getById(req.accountId);
  }

  /**
   * @summary обновить данные аккаунта
   * @param req
   * @param model - данные для обновления
   */
  @Put('/info')
  @Security('jwt', ['user:updateAny'])
  async updateAccountInfo(@Request() req: MRequest, @Body() model: AccountInfo): Promise<Account> {
    return await AccountsService.updateAsUser(model, req.accountId);
  }

  /**
   * @summary Добавить недвижимость в избранное
   * @param req
   * @param id - _id недвижимости
   */
  @Put('/favorites/{id}')
  @Security('jwt', ['user:updateAny'])
  async addFavorites(@Request() req: MRequest, @Path('id') id: string): Promise<Account> {
    return await AccountsService.addFavorites(id, req.accountId);
  }

  /**
   * @summary Удалить недвижимость из избранного
   * @param req
   * @param id - _id недвижимости
   */
  @Delete('/favorites/{id}')
  @Security('jwt', ['user:updateAny'])
  async rmFavorites(@Request() req: MRequest, @Path('id') id: string): Promise<Account> {
    return await AccountsService.rmFavorites(id, req.accountId);
  }
}
