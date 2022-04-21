import { MODERATION_STATUSES } from '../constants';
import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { ObjectId } from 'mongodb';
import { LogicError } from '../../../../../utils/LogicError';
import { ESTATE_NOT_FOUND } from '../../realEstate/errorCodes.config';
import { ACCESS_DENIED } from '../../../../accounts/errorCodes.config';

export const estateToDraft = async (
  estateId: string,
  accountId: string,
): Promise<RealEstateDoc> => {
  const estate: RealEstateDoc = await realEstateModel.findById(estateId);

  if (!estate) {
    throw new LogicError(ESTATE_NOT_FOUND, { estateId });
  }

  if (accountId.toString() !== estate.accountId.toString()) {
    throw new LogicError(ACCESS_DENIED, { accountId });
  }

  return realEstateModel.findOneAndUpdate(
    { _id: new ObjectId(estateId) },
    {
      moderationStatus: MODERATION_STATUSES.DRAFT,
    },
    { new: true },
  );
};
