import { LogicError } from '../../../../../utils/LogicError';
import { AgentDoc, agentModel } from '../agent.model';
import { AGENT_NOT_FOUND } from '../errorCodes.config';

export const getAgentByAccount = async (accountId: string): Promise<AgentDoc> => {
  const agent: AgentDoc = await agentModel.findOne({ accountId });

  if (!agent) {
    throw new LogicError(AGENT_NOT_FOUND, { accountId });
  }

  return agent;
};
