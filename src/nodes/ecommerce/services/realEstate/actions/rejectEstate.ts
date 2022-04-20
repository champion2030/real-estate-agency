import { MODERATION_STATUSES } from '../constants';
import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { ObjectId } from 'mongodb';

export const rejectEstate = async (estateId: string): Promise<RealEstateDoc> => {
  return realEstateModel.findOneAndUpdate(
    { _id: new ObjectId(estateId) },
    {
      moderationStatus: MODERATION_STATUSES.REJECTED,
    },
    { new: true },
  );
};
