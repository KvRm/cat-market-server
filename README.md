``Запуск:``

1. Удалить папку drizzle (там находятся миграции)
2. Установить зависимости
```
npm ci
```
3. Сделать миграции
```
npm run drizzle:generate
npm run drizzle:migrate
```
4. Запустить дев сервер
```
npm run start
```
