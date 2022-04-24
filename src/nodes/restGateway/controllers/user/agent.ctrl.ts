import { Controller, Get, Query, Request, Route, Tags } from 'tsoa';
import { MRequest } from '../../app';
import { Agent } from '../../../ecommerce/services/agents/agent.type';
import { AGENT_ROLES } from '../../../../constants';
import { ListResponse } from '../../../../interfaces';

const AgentService = require('../../../ecommerce/services/agents/agents.service');

@Route('user/agent')
@Tags('User')
export class UserAgentController extends Controller {
  /**
   * @summary получить список всех агентов в системе ( пользовтаельский метод )
   * @param req
   * @param page номер страницы
   * @param pageSize кол-во элементов на странице
   * @param sort сортировка (filed или -field)
   * @param email почта
   * @param phone телефон
   * @param role роль агента
   */
  @Get()
  async listOfAgentsByUser(
    @Request() req: MRequest,
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() sort?: string,
    @Query() email?: string,
    @Query() phone?: string,
    @Query() role?: AGENT_ROLES,
  ): Promise<ListResponse<Agent[]>> {
    return await AgentService.getListOfAgents({
      page,
      pageSize,
      sort,
      email,
      phone,
      isActive: true,
      role,
    });
  }
}
