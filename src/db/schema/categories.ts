import { relations } from 'drizzle-orm'
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { products } from './product'

export const categories = mysqlTable(
  'categories',
  {
    id: int().primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }).notNull(),

    ...schemaHelper.timestamps,
  },
)

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))
