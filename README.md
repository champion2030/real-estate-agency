# real-estate-agency

# Назначение директорий

src - основной код сервисов

Внутри src:

- nodes - узлы объединяющие (логически) несколько сервисов в общий функционал. Например accounts содержит все сервисы для работы с аккаунтами в системе, restGateway - для реализации REST API и тп. В данных nodes сервисы допустимо перемещать, если видно что с эволюцеей кода сервис нужно прикрепить к другой node или же вынести в отдельную самостоятельную node.
- utils - утилиты, хелперы для кода

# Назначение файлов

- global.config.ts - общий конфиг между сервисами
- .env - файлы используются для настройки окружения.

# Генерация swagger документации

- `npm run tsoa:gen` - генерирует доки и routes для express

# Запуск проекта

- `npm run dev;fast` в dev режиме с автоматическим перезапуском при изменениях 

# Переменные окружения

Локально нужно создать `.env` файлы для окружений.

Переменные "по умолчанию" находятся в `src/config`
