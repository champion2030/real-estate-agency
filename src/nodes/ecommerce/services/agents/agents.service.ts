import { createAgent } from './actions/createAgent';
import { getAgentByAccount } from './actions/getAgentByAccount';
import { updateByAgent } from './actions/updateByAgent';
import { getListOfAgents } from './actions/getListOfAgents';

const agentsActions = {
  createAgent,
  getAgentByAccount,
  updateByAgent,
  getListOfAgents,
};

module.exports = agentsActions;
