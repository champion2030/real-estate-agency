import { LogicError } from '../../../../../utils/LogicError';
import { AccountDoc, accountModel } from '../../../../accounts/services/accounts/account.model';
import { AgentDoc, agentModel } from '../agent.model';
import { AGENT_ALREADY_EXIST } from '../errorCodes.config';
import { ROLES } from '../../../../../roles.config';

export const createAgent = async (accountId: string): Promise<AgentDoc> => {
  const foundAccountAgent: AgentDoc = await agentModel.findOne({ accountId });

  if (foundAccountAgent) {
    throw new LogicError(AGENT_ALREADY_EXIST, foundAccountAgent);
  }

  const { email, phone, firstName, secondName, middleName }: AccountDoc =
    await accountModel.findById(accountId);

  const createdAgent: AgentDoc = await agentModel.create({
    accountId,
    isActive: true,
    email,
    phone,
    firstName,
    secondName,
    middleName,
    'publicContacts.phones': [phone],
    'publicContacts.emails': [email],
  });

  await accountModel.findByIdAndUpdate({ _id: accountId }, { isAgent: true, role: ROLES.AGENT });

  return createdAgent;
};
