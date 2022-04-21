import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { UpsertEstate } from '../realEstate.type';
import { ObjectId } from 'mongodb';
import { LogicError } from '../../../../../utils/LogicError';
import { ESTATE_NOT_FOUND } from '../../realEstate/errorCodes.config';

export interface UpdateEstateByAdminParams {
  estateId: string;
  estate: UpsertEstate;
}

export const updateByAdmin = async (params: UpdateEstateByAdminParams): Promise<RealEstateDoc> => {
  const { estateId, estate } = params;

  const foundEstate: RealEstateDoc = await realEstateModel.findById(estateId);

  if (!foundEstate) {
    throw new LogicError(ESTATE_NOT_FOUND, { estateId });
  }

  return realEstateModel.findOneAndUpdate({ _id: new ObjectId(estateId) }, estate, { new: true });
};
