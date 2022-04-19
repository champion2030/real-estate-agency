import { Controller, Request, Route, Tags, Get, Security, Path, Post } from 'tsoa';
import { MRequest } from '../app';
import { Account } from '../../accounts/services/accounts/account.type';
import { Agent } from '../../ecommerce/services/agents/agent.type';

const AccountsService = require('../../accounts/services/accounts/accounts.service');
const AgentService = require('../../ecommerce/services/agents/agents.service');

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
   * @param req
   * @param id - _id сущности базы данных
   */
  @Get('{id}')
  @Security('jwt', ['accounts:readAny'])
  async get(@Request() req: MRequest, @Path('id') id: string): Promise<Account> {
    return await AccountsService.getById(id);
  }

  /**
   * @summary Создать агента
   * @param req
   * @param accountId - _id аккаунта
   */
  @Post('{accountId}')
  @Security('jwt', ['admin:createAny'])
  async createAgent(
    @Request() req: MRequest,
    @Path('accountId') accountId: string,
  ): Promise<Agent> {
    return await AgentService.createAgent(accountId);
  }
}
