import { createEstateDraftByUser } from './actions/createEstateDraftByUser';
import { updateEstateDraftByUser } from './actions/updateEstateDraftByUser';
import { rejectEstate } from './actions/rejectEstate';
import { approveEstate } from './actions/approveEstate';
import { sendToModerationEstate } from './actions/sendToModerationEstate';
import { updateEstateStatus } from './actions/updateEstateStatus';

const realEstateActions = {
  createEstateDraftByUser,
  updateEstateDraftByUser,
  rejectEstate,
  approveEstate,
  sendToModerationEstate,
  updateEstateStatus,
};

module.exports = realEstateActions;
