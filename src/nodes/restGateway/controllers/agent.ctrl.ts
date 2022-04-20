import { Controller, Request, Route, Tags, Security, Put, Body } from 'tsoa';
import { MRequest } from '../app';
import { Agent, UpdateAgentParams } from '../../ecommerce/services/agents/agent.type';

const AgentService = require('../../ecommerce/services/agents/agents.service');

@Route('agent')
@Tags('Agent')
export class AgentController extends Controller {
  /**
   * @summary Обновить информацию о текущем агенте
   */
  @Put('/info')
  @Security('jwt', ['agents:updateAny', 'agent:updateAny'])
  async updateInfo(@Request() req: MRequest, @Body() model?: UpdateAgentParams): Promise<Agent> {
    return await AgentService.updateByAgent({ accountId: req.accountId, ...model });
  }
}
