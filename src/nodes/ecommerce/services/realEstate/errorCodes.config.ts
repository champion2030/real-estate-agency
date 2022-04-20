import { MODERATION_STATUSES } from './constants';
import { ErrorCodeItem } from '../../../../utils/LogicError';

export const ESTATE_NOT_FOUND = {
  type: 'E_ESTATE_NOT_FOUND',
  code: 400,
  message: 'Недвижимость не найдена',
};

export const ESTATE_STATUS_ALREADY_SAME = (estateStatus: MODERATION_STATUSES): ErrorCodeItem => ({
  type: 'E_ESTATE_STATUS_ALREADY_SAME',
  code: 400,
  message: `Недвижимость уже находится в статусе ${estateStatus}`,
});

export const INVALID_ESTATE_STATUS = {
  type: 'E_INVALID_ESTATE_STATUS',
  code: 400,
  message: 'Не подходящий статус',
};
