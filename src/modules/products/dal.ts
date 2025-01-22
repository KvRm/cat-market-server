import { and, inArray, like } from 'drizzle-orm'
import { products } from '../../db/schema/product'
import { db } from '../../db/setup'

export async function getAll(params: { search?: string, categories?: number[] }) {
  return await db.select().from(products).where(and(
    params.search
      ? like(products.name, `%${params.search}%`)
      : undefined,
    params.categories?.length
      ? inArray(products.categoryId, params.categories)
      : undefined,
  ))
}
