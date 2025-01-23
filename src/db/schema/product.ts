import { relations } from 'drizzle-orm'
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { cartsToProducts } from './carts-to-products'
import { categories } from './categories'

export const products = mysqlTable(
  'products',
  {
    id: int().primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }).notNull(),
    categoryId: int('category_id').notNull(),
    imageUrl: varchar('image_url', { length: 1024 }).notNull(),
    price: int('prices').notNull(),

    ...schemaHelper.timestamps,
  },
)

export const productsRelations = relations(products, ({ one, many }) => ({
  cartsToProducts: many(cartsToProducts),

  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))
