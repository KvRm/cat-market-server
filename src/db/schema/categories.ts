import { relations } from 'drizzle-orm'
import * as t from 'drizzle-orm/mysql-core'
import { mysqlTable as table } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { products } from './product'

export const categories = table(
  'categories',
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar('name', { length: 256 }).notNull(),

    ...schemaHelper.timestamps,
  },
)

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))
