import { relations } from 'drizzle-orm'
import { int, mysqlTable } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { cartsToProducts } from './carts-to-products'
import { users } from './users'

export const carts = mysqlTable(
  'carts',
  {
    id: int().primaryKey().autoincrement(),
    userId: int('user_id').notNull().primaryKey(),

    ...schemaHelper.timestamps,
  },
)

export const cartsRelations = relations(carts, ({ one, many }) => ({
  cartsToProducts: many(cartsToProducts),

  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}))
