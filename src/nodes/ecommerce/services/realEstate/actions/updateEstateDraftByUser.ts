import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { UpsertEstate } from '../realEstate.type';
import { ObjectId } from 'mongodb';

export interface UpdateEstateDraftByUserParams {
  estateId: string;
  estate: UpsertEstate;
}

export const updateEstateDraftByUser = async (
  params: UpdateEstateDraftByUserParams,
): Promise<RealEstateDoc> => {
  const { estateId, estate } = params;

  return realEstateModel.findOneAndUpdate({ _id: new ObjectId(estateId) }, estate, {
    new: true,
  });
};
