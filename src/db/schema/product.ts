import { relations } from 'drizzle-orm'
import * as t from 'drizzle-orm/mysql-core'
import { mysqlTable as table } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { categories } from './categories'

export const products = table(
  'products',
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar('name', { length: 256 }).notNull(),
    categoryId: t.int('category_id').notNull(),
    imageUrl: t.varchar('image_url', { length: 1024 }).notNull(),

    ...schemaHelper.timestamps,
  },
)

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))
