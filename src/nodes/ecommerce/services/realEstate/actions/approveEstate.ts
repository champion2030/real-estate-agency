import { MODERATION_STATUSES } from '../constants';
import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { ObjectId } from 'mongodb';

export const approveEstate = async (estateId: string): Promise<RealEstateDoc> => {
  return realEstateModel.findOneAndUpdate(
    { _id: new ObjectId(estateId) },
    {
      moderationStatus: MODERATION_STATUSES.APPROVED,
    },
    { new: true },
  );
};
