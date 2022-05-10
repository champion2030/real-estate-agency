import {
  Controller,
  Request,
  Route,
  Tags,
  Get,
  Security,
  Path,
  Post,
  Query,
  Put,
  Body,
} from 'tsoa';
import { MRequest } from '../../app';
import { Account } from '../../../accounts/services/accounts/account.type';
import { Agent } from '../../../ecommerce/services/agents/agent.type';
import { ROLES } from '../../../../roles.config';
import { ListResponse } from '../../../../interfaces';
import { AGENT_ROLES } from '../../../../constants';

const AccountsService = require('../../../accounts/services/accounts/accounts.service');
const AgentService = require('../../../ecommerce/services/agents/agents.service');

@Route('admin/accounts')
@Tags('Admin')
export class AccountsController extends Controller {
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

  /**
   * @summary получить список всех аккаунтов в системе
   * @param req
   * @param page номер страницы
   * @param pageSize кол-во элементов на странице
   * @param sort сортировка (filed или -field)
   * @param email почта
   * @param phone телефон
   * @param isActive
   * @param isAgent
   * @param role роль аккаунта
   */
  @Get()
  @Security('jwt', ['accounts:readAny'])
  async listOfAccountsByAdmin(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() email?: string,
    @Query() phone?: string,
    @Query() isActive?: boolean,
    @Query() isAgent?: boolean,
    @Query() role?: ROLES,
  ): Promise<ListResponse<Account[]>> {
    return await AccountsService.getListOfAccounts({
      page,
      pageSize,
      sort,
      email,
      phone,
      isActive,
      isAgent,
      role,
    });
  }

  /**
   * @summary получить список всех агентов в системе
   * @param req
   * @param page номер страницы
   * @param pageSize кол-во элементов на странице
   * @param sort сортировка (filed или -field)
   * @param accountId
   * @param email почта
   * @param phone телефон
   * @param isActive
   * @param role роль агента
   */
  @Get('/agents')
  @Security('jwt', ['agents:readAny'])
  async listOfAgentsByAdmin(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() accountId?: string,
    @Query() email?: string,
    @Query() phone?: string,
    @Query() isActive?: boolean,
    @Query() role?: AGENT_ROLES,
  ): Promise<ListResponse<Agent[]>> {
    return await AgentService.getListOfAgents({
      page,
      pageSize,
      sort,
      accountId,
      email,
      phone,
      isActive,
      role,
    });
  }

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
   * @summary редактировать аккаунт по id
   * @param req
   * @param id - _id аккаунта
   * @param model - данные для обновления
   */
  @Put('{id}')
  @Security('jwt', ['accounts:updateAny'])
  async update(
    @Request() req: MRequest,
    @Path('id') id: string,
    @Body() model?: Account,
  ): Promise<Account> {
    return await AccountsService.updateAsAdmin(model, id);
  }
}
