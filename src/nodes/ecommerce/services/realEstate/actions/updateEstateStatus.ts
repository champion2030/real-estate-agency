import { MODERATION_STATUSES } from '../constants';
import { RealEstateDoc, realEstateModel } from '../realEstate.model';
import { LogicError } from '../../../../../utils/LogicError';
import {
  ESTATE_NOT_FOUND,
  ESTATE_STATUS_ALREADY_SAME,
  INVALID_ESTATE_STATUS,
} from '../errorCodes.config';
import { rejectEstate } from './rejectEstate';
import { sendToModerationEstate } from './sendToModerationEstate';
import { approveEstate } from './approveEstate';

export interface UpdateEstateStatusParams {
  estateId: string;
  estateStatus: MODERATION_STATUSES;
}

export const updateEstateStatus = async (
  params: UpdateEstateStatusParams,
): Promise<RealEstateDoc> => {
  const { estateId, estateStatus } = params;

  const foundEstate: RealEstateDoc = await realEstateModel.findById(estateId);

  if (!foundEstate) {
    throw new LogicError(ESTATE_NOT_FOUND, { estateId });
  }

  if (estateStatus === foundEstate.moderationStatus) {
    throw new LogicError(ESTATE_STATUS_ALREADY_SAME(estateStatus), { estateId });
  }

  let updatedEstate: RealEstateDoc;

  switch (estateStatus) {
    case MODERATION_STATUSES.MODERATION:
      updatedEstate = await sendToModerationEstate(estateId);
      break;
    case MODERATION_STATUSES.REJECTED:
      updatedEstate = await rejectEstate(estateId);
      break;
    case MODERATION_STATUSES.APPROVED:
      updatedEstate = await approveEstate(estateId);
      break;
    default:
      throw new LogicError(INVALID_ESTATE_STATUS, { estateStatus });
  }

  return updatedEstate;
};
