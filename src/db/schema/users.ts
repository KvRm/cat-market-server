import { int, mysqlTable, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'

export const users = mysqlTable(
  'users',
  {
    id: int().primaryKey().autoincrement(),
    firstName: varchar('first_name', { length: 256 }).notNull(),
    secondName: varchar('second_name', { length: 256 }),
    lastName: varchar('last_name', { length: 256 }).notNull(),
    email: varchar({ length: 256 }).notNull().unique(),
    phone: varchar({ length: 20 }).notNull(),
    sex: int().notNull(),
    password: varchar({ length: 256 }).notNull(),

    ...schemaHelper.timestamps,
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('email_idx').on(table.email),
    }
  },
)
