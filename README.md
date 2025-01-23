``Запуск:``

1. Удалить папку drizzle (там находятся миграции)
2. Установить зависимости
```
npm ci
```
3. Создать файл .env и скопировать в него содержимое .env example
4. Сделать миграции
```
npm run drizzle:generate
npm run drizzle:migrate
```
5. Запустить дев сервер
```
npm run start
```
