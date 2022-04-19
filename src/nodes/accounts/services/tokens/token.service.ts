import { login } from './actions/login';
import { checkToken } from './actions/checkToken';
import { refreshTokens } from './actions/refreshTokens';
import { logout } from './actions/logout';

const tokenActions = {
  login,
  checkToken,
  refreshTokens,
  logout,
};

module.exports = tokenActions;
