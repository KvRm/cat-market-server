import { and, eq } from 'drizzle-orm'
import { carts } from '../../db/schema/cart'
import { cartsToProducts } from '../../db/schema/carts-to-products'
import { products } from '../../db/schema/product'
import { db } from '../../db/setup'

export async function getOne(params: { userId: number }) {
  return (await db.select().from(carts).where(eq(carts.userId, params.userId)))[0]
}

export async function createCart(params: { userId: number }) {
  return await db.insert(carts).values({ userId: params.userId })
}

export async function getOneWithProducts(params: { userId: number }) {
  const result = {
    cartId: null as null | number,
    products: [] as (typeof products.$inferSelect & { count: number })[],
  }

  const queryResult = (await db.select()
    .from(cartsToProducts)
    .leftJoin(carts, eq(carts.id, cartsToProducts.cartId))
    .where(eq(carts.userId, params.userId))
    .leftJoin(products, eq(products.id, cartsToProducts.productId))
  )

  if (!queryResult.length)
    return null

  result.cartId = queryResult[0]!.carts!.id

  queryResult.forEach(({ products, carts_to_products }) => {
    if (products)
      result.products.push({ ...products, count: carts_to_products.count })
  })
  return result
}

export async function clear(params: { userId: number }) {
  const cart = await getOne({ userId: params.userId })

  if (!cart)
    return false

  await db.delete(cartsToProducts).where(eq(cartsToProducts.cartId, cart.id))

  return true
}

export async function addProduct(params: { userId: number, productId: number, count: number }) {
  let cart = await getOne({ userId: params.userId })
  if (!cart)
    await createCart({ userId: params.userId })
  cart = await getOne({ userId: params.userId })

  if (!cart)
    return false

  const exisitingProduct = (await db.select()
    .from(cartsToProducts)
    .where(and(eq(cartsToProducts.cartId, cart.id), eq(cartsToProducts.productId, params.productId))))[0]

  if (exisitingProduct) {
    if (params.count > 0) {
      await db.update(cartsToProducts)
        .set({ count: params.count })
        .where(and(eq(cartsToProducts.cartId, cart.id), eq(cartsToProducts.productId, params.productId)))
    }
    else {
      await db.delete(cartsToProducts)
        .where(and(eq(cartsToProducts.cartId, cart.id), eq(cartsToProducts.productId, params.productId)))
    }
  }
  else {
    await db.insert(cartsToProducts).values({ cartId: cart.id, productId: params.productId, count: params.count })
  }

  return true
}
