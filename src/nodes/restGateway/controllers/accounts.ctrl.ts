import { Controller, Request, Route, Tags, Get, Security, Path } from 'tsoa';
import { MRequest } from '../app';
import { Account } from '../../accounts/services/accounts/account.type';

const AccountsService = require('../../accounts/services/accounts/accounts.service');

export interface RegistrationPostData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  imageId?: string;
}

@Route('accounts')
@Tags('Accounts')
export class AccountsController extends Controller {
  /**
   * @summary получить по id
   * @param id - _id сущности базы данных
   */
  @Get('{id}')
  @Security('jwt', ['accounts:readAny'])
  async get(@Request() req: MRequest, @Path('id') id: string): Promise<Account> {
    return await AccountsService.getById(id);
  }
}
