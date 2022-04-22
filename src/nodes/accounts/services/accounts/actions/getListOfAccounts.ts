import { isNil, omitBy } from 'lodash';
import { ROLES } from '../../../../../roles.config';
import { ListResponse } from '../../../../../interfaces';
import { Account } from '../account.type';
import { accountModel } from '../account.model';
import { createCustomListResponse } from '../../../../../utils/responses';
import { transformSort } from '../../../../../utils/transformSort';

export interface GetListOfProductsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  isAgent?: boolean;
  role?: ROLES;
}

export const getListOfAccounts = async (
  params: GetListOfProductsParams,
): Promise<ListResponse<Account[]>> => {
  const { page = 1, pageSize = 10, sort, email, phone, isActive, isAgent, role } = params;
  const offset = (page - 1) * pageSize;
  const sortObject = transformSort(sort ?? '-updatedAt');

  const filter = omitBy(
    {
      email,
      phone,
      isActive,
      isAgent,
      role,
    },
    isNil,
  );

  const [rows] = await accountModel.aggregate([
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

  const accounts: ListResponse<Account[]> = createCustomListResponse({
    rows,
    page,
    pageSize,
    total,
  });

  return accounts;
};
