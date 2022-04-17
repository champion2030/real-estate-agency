import { MRequest } from '../app';
import { AccessControl } from 'accesscontrol';
import { NOT_GRANTED } from '../../../errorCodes.config';
import { accountModel } from '../../accounts/services/accounts/account.model';
import { LogicError } from '../../../utils/LogicError';
import { grantsObject } from '../../../roles.config';
import { INVALID_TOKEN } from '../../accounts/errorCodes.config';

const ac = new AccessControl(grantsObject);

export async function expressAuthentication(
  req: MRequest,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  req.locale.language = 'ru';

  if (!req.accountId) {
    return Promise.reject(new LogicError(INVALID_TOKEN));
  }

  let permissionGranted = false;

  try {
    const { role } = await accountModel.findById(req.accountId);

    for (const scope of scopes) {
      const [resource, action] = scope.split(':');

      const permission = ac.can(role)[action](resource);

      if (permission.granted) {
        permissionGranted = permission.granted;
        break;
      }
    }

    if (!permissionGranted) {
      return Promise.reject(new LogicError(NOT_GRANTED));
    }

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(new LogicError(NOT_GRANTED));
  }
}
