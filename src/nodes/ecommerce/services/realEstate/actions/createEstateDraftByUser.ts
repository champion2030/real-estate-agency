import { MODERATION_STATUSES } from '../constants';
import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { UpsertEstate } from '../realEstate.type';

export interface CreateEstateDraftByUserParams {
  accountId: string;
  estate: UpsertEstate;
}

export const createEstateDraftByUser = async (
  params: CreateEstateDraftByUserParams,
): Promise<RealEstateDoc> => {
  const { accountId, estate } = params;

  return await realEstateModel.create({
    ...estate,
    accountId,
    moderationStatus: MODERATION_STATUSES.DRAFT,
  });
};
