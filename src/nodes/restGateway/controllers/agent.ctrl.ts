import { Controller, Request, Route, Tags, Security, Put, Body } from 'tsoa';
import { MRequest } from '../app';
import { Agent, UpdateAgentParams } from '../../ecommerce/services/agents/agent.type';

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

@Route('agent')
@Tags('Agent')
export class AgentController extends Controller {
  /**
   * @summary Обновить информацию о текущем агенте
   */
  @Put('/info')
  @Security('jwt', ['agents:updateOwn'])
  async updateInfo(@Request() req: MRequest, @Body() model?: UpdateAgentParams): Promise<Agent> {
    return await AgentService.updateByAgent({ accountId: req.accountId, ...model });
  }
}
