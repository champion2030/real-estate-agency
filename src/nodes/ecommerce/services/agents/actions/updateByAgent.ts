import { AgentDoc, agentModel } from '../agent.model';
import { UpdateAgentParams } from '../agent.type';
import { getByAccount } from './getByAccount';
import { isNil, omitBy } from 'lodash';

export const updateByAgent = async (
  params: UpdateAgentParams & { accountId: string },
): Promise<AgentDoc> => {
  const {
    email,
    phone,
    firstName,
    middleName,
    secondName,
    isActive,
    publicContacts,
    description,
    accountId,
  } = params;

  const foundAccountAgent: AgentDoc = await getByAccount(accountId);

  const dataToUpdate = omitBy(
    {
      email,
      phone,
      firstName,
      middleName,
      secondName,
      isActive,
      description,
      $addToSet: omitBy(
        {
          'publicContacts.phones': publicContacts?.phones ? { $each: publicContacts.phones } : null,
          'publicContacts.emails': publicContacts?.emails ? { $each: publicContacts.emails } : null,
        },
        isNil,
      ),
    },
    isNil,
  );

  return agentModel.findOneAndUpdate({ _id: foundAccountAgent._id }, dataToUpdate, { new: true });
};
