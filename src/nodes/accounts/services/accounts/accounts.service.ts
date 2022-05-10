import { accountRegistration } from './actions/accountRegistration';
import { getById } from './actions/getById';
import { authenticate } from './actions/authenticate';
import { getByPhone } from './actions/getByPhone';
import { addFavorites } from './actions/addFavorites';
import { rmFavorites } from './actions/rmFavorites';
import { getListOfAccounts } from './actions/getListOfAccounts';
import { updateAsUser } from './actions/updateAsUser';
import { updateAsAdmin } from './actions/updateAsAdmin';

const accountsActions = {
  accountRegistration,
  getById,
  authenticate,
  getByPhone,
  updateAsUser,
  addFavorites,
  rmFavorites,
  getListOfAccounts,
  updateAsAdmin,
};

module.exports = accountsActions;
