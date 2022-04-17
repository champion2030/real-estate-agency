export const CRITICAL_ERROR = {
  type: 'E_CRITICAL_ERROR',
  code: 500,
  message: 'Не обработанная в системе ошибка, приведшая к падению сервиса',
};

export const JSON_SYNTAX_ERROR = {
  type: 'E_JSON_SYNTAX_ERROR',
  message: 'Не верно составлен JSON в запросе, ошибка синтаксиса',
};

export const TSOA_VALIDATION = {
  type: 'E_TSOA_VALIDATION',
  message: 'Ошибка встроенного в swagger (tsoa) валидатора',
};

export const UNKNOW_ERROR = {
  type: 'E_UNKNOW_ERROR',
  code: 500,
  message: 'Ошибка неизвестной категории, не приводящая к падению сервиса',
};

export const MONGOOSE_VALIDATION_ERROR = {
  type: 'E_MONGOOSE_VALIDATION_ERROR',
  code: 400,
  message: 'Ошибка валидации данных в mongoose',
};

export const MONGOOSE = {
  type: 'E_MONGOOSE',
  code: 400,
  message: 'Ошибка при обращении в mongoose',
};

export const MONGOOSE_NOT_CONNECTED = {
  type: 'MONGOOSE_NOT_CONNECTED',
  code: 400,
  message: 'Ошибка при подключении в mongodb',
};

export const NOT_GRANTED = {
  type: 'E_NOT_GRANTED',
  code: 403,
  message: 'Недостаточно прав для доступа к ресурсу',
};
