import { accountRegistration } from './actions/accountRegistration';
import { getById } from './actions/getById';
import { authenticate } from './actions/authenticate';
import { getByPhone } from './actions/getByPhone';

const accountsActions = {
  accountRegistration,
  getById,
  authenticate,
  getByPhone,
};

module.exports = accountsActions;
