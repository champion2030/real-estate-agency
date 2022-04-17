import { login } from './actions/login';
import { checkToken } from './actions/checkToken';
import { refreshTokens } from './actions/refreshTokens';

const tokenActions = {
  login,
  checkToken,
  refreshTokens,
};

module.exports = tokenActions;
