import { isNil, omitBy } from 'lodash';
import { ListResponse } from '../../../../../interfaces';
import { createCustomListResponse } from '../../../../../utils/responses';
import { transformSort } from '../../../../../utils/transformSort';
import { MODERATION_STATUSES } from '../constants';
import { HOUSE_MATERIAL_TYPE, PROPERTY_TYPE } from '../../../../../constants';
import { ObjectId } from 'mongodb';
import { realEstateModel } from '../realEstate.model';
import { RealEstate } from '../realEstate.type';

export interface GetListOfEstatesParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  accountId?: string;
  agentId?: string;
  moderationStatus?: MODERATION_STATUSES;
  isActive?: boolean;
  citiId?: string;
  districtId?: string;
  streetOrAvenueId?: string;
  priceFrom?: number;
  priceTo?: number;
  code?: string;
  roomsNumber?: number;
  propertyType?: PROPERTY_TYPE;
  isCorner?: boolean;
  isBalcony?: boolean;
  isLoggia?: boolean;
  houseMaterial?: HOUSE_MATERIAL_TYPE;
}

export const getListOfEstates = async (
  params: GetListOfEstatesParams,
): Promise<ListResponse<RealEstate[]>> => {
  const {
    page = 1,
    pageSize = 10,
    sort,
    accountId,
    agentId,
    moderationStatus,
    isActive,
    citiId,
    districtId,
    streetOrAvenueId,
    priceFrom,
    priceTo,
    code,
    roomsNumber,
    propertyType,
    isCorner,
    isBalcony,
    isLoggia,
    houseMaterial,
  } = params;
  const offset = (page - 1) * pageSize;
  const sortObject = transformSort(sort ?? '-updatedAt');

  const filter = omitBy(
    {
      accountId: accountId ? new ObjectId(accountId) : null,
      agentId: agentId ? new ObjectId(agentId) : null,
      moderationStatus,
      isActive,
      citiId,
      districtId,
      streetOrAvenueId,
      price:
        priceFrom || priceTo
          ? omitBy(
              {
                $gte: priceFrom,
                $lte: priceTo,
              },
              isNil,
            )
          : null,
      code,
      roomsNumber,
      propertyType,
      isCorner,
      isBalcony,
      isLoggia,
      houseMaterial,
    },
    isNil,
  );

  const [rows] = await realEstateModel.aggregate([
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

  const estates: ListResponse<RealEstate[]> = createCustomListResponse({
    rows,
    page,
    pageSize,
    total,
  });

  return estates;
};
