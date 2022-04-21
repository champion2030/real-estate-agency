import { createEstateDraftByUser } from './actions/createEstateDraftByUser';
import { updateEstateDraftByUser } from './actions/updateEstateDraftByUser';
import { rejectEstate } from './actions/rejectEstate';
import { approveEstate } from './actions/approveEstate';
import { estateToModeration } from './actions/estateToModeration';
import { estateToDraft } from './actions/estateToDraftEstate';
import { updateByAdmin } from './actions/updateByAdmin';

const realEstateActions = {
  createEstateDraftByUser,
  updateEstateDraftByUser,
  rejectEstate,
  approveEstate,
  estateToModeration,
  estateToDraft,
  updateByAdmin,
};

module.exports = realEstateActions;
