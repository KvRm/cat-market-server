import { relations } from 'drizzle-orm'
import { int, mysqlTable, primaryKey } from 'drizzle-orm/mysql-core'
import { carts } from './cart'
import { products } from './product'

export const cartsToProducts = mysqlTable(
  'carts_to_products',
  {
    cartId: int('cart_id').notNull().references(() => carts.id),
    productId: int('product_id').notNull().references(() => products.id),
    count: int().notNull(),
  },
  t => ({
    pk: primaryKey({ columns: [t.cartId, t.productId] }),
  }),
)
export const cartsToProductsRelations = relations(cartsToProducts, ({ one }) => ({
  product: one(products, {
    fields: [cartsToProducts.productId],
    references: [products.id],
  }),
  cart: one(carts, {
    fields: [cartsToProducts.cartId],
    references: [carts.id],
  }),
}))
