export const ACCOUNT_EMAIL_EXIST = {
  type: 'E_ACCOUNT_EMAIL_EXIST',
  code: 400,
  message: 'Аккаунт с таким email уже существует в системе',
};

export const ACCOUNT_PHONE_EXIST = {
  type: 'E_ACCOUNT_PHONE_EXIST',
  code: 400,
  message: 'Аккаунт с таким phone уже существует в системе',
};

export const BAD_LOGIN_OR_PASSWORD = {
  type: 'E_BAD_LOGIN_OR_PASSWORD',
  code: 400,
  message: 'Неверный логин или пароль',
};

export const BAD_CREDENTIALS = {
  type: 'E_BAD_CREDENTIALS',
  code: 403,
  message: 'Нет прав для доступа к ресурсу',
};

export const LOGOUT = {
  type: 'E_LOGOUT',
  code: 400,
  message: 'Ошибка при выходе из системы',
};

export const EMPTY_TOKEN = {
  type: 'E_EMPTY_TOKEN',
  code: 400,
  message: 'Токен не передан',
};

export const TOKEN_VERIFY_ERROR = {
  type: 'E_TOKEN_VERIFY_ERROR',
  code: 403,
  message: 'Ошибка верификации токена',
};

export const REFRESH_TOKEN_EXPIRED = {
  type: 'E_REFRESH_TOKEN_EXPIRED',
  code: 403,
  message: 'Токен просрочен',
};

export const INVALID_REFRESH_TOKEN = {
  type: 'E_INVALID_REFRESH_TOKEN',
  code: 403,
  message: 'Невалидный или просроченный рефреш токен',
};

export const INVALID_TOKEN = {
  type: 'E_INVALID_TOKEN',
  code: 403,
  message: 'Невалидный токен',
};

export const PARAMS_VALIDATION_ERROR = {
  type: 'E_PARAMS_VALIDATION_ERROR',
  code: 400,
  message: 'Ошибка валидации параметров запроса',
};

export const ACCOUNT_NOT_FOUND = {
  type: 'E_ACCOUNT_NOT_FOUND',
  code: 404,
  message: 'Аккаунт не найден',
};
