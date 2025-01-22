import * as t from 'drizzle-orm/mysql-core'
import { mysqlTable as table } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'

export const users = table(
  'users',
  {
    id: t.int().primaryKey().autoincrement(),
    firstName: t.varchar('first_name', { length: 256 }).notNull(),
    secondName: t.varchar('second_name', { length: 256 }),
    lastName: t.varchar('last_name', { length: 256 }).notNull(),
    email: t.varchar({ length: 256 }).notNull().unique(),
    phone: t.varchar({ length: 20 }).notNull(),
    sex: t.int().notNull(),
    password: t.varchar({ length: 256 }).notNull(),

    ...schemaHelper.timestamps,
  },
  (table) => {
    return {
      emailIndex: t.uniqueIndex('email_idx').on(table.email),
    }
  },
)
