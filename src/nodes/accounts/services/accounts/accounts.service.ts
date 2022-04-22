import { accountRegistration } from './actions/accountRegistration';
import { getById } from './actions/getById';
import { authenticate } from './actions/authenticate';
import { getByPhone } from './actions/getByPhone';
import { updateAsUser } from './actions/updateAsUser';
import { addFavorites } from './actions/addFavorites';
import { rmFavorites } from './actions/rmFavorites';
import { getListOfAccounts } from './actions/getListOfAccounts';

const accountsActions = {
  accountRegistration,
  getById,
  authenticate,
  getByPhone,
  updateAsUser,
  addFavorites,
  rmFavorites,
  getListOfAccounts,
};

module.exports = accountsActions;
