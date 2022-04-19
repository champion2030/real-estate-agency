import { createAgent } from './actions/createAgent';
import { getByAccount } from './actions/getByAccount';
import { updateByAgent } from './actions/updateByAgent';

const agentsActions = {
  createAgent,
  getByAccount,
  updateByAgent,
};

module.exports = agentsActions;
