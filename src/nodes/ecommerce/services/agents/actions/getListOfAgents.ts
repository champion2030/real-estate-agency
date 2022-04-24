import { isNil, omitBy } from 'lodash';
import { ListResponse } from '../../../../../interfaces';
import { createCustomListResponse } from '../../../../../utils/responses';
import { transformSort } from '../../../../../utils/transformSort';
import { Agent } from '../agent.type';
import { AGENT_ROLES } from '../../../../../constants';
import { agentModel } from '../agent.model';
import { ObjectId } from 'mongodb';

export interface GetListOfAgentsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  accountId?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  role?: AGENT_ROLES;
}

export const getListOfAgents = async (
  params: GetListOfAgentsParams,
): Promise<ListResponse<Agent[]>> => {
  const { page = 1, pageSize = 10, sort, email, accountId, phone, isActive, role } = params;
  const offset = (page - 1) * pageSize;
  const sortObject = transformSort(sort ?? '-createdAt');

  const filter = omitBy(
    {
      accountId: accountId ? new ObjectId(accountId) : null,
      email,
      phone,
      isActive,
      role,
    },
    isNil,
  );

  const [rows] = await agentModel.aggregate([
    {
      $match: filter,
    },
    { $sort: sortObject },
    {
      $facet: {
        rows: [{ $skip: offset }, { $limit: pageSize }],
        pageInfo: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);

  const total = rows?.pageInfo[0]?.total ?? 0;

  delete rows.pageInfo;

  const agents: ListResponse<Agent[]> = createCustomListResponse({
    rows,
    page,
    pageSize,
    total,
  });

  return agents;
};
