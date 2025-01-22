import { categories } from '../../db/schema/categories'
import { db } from '../../db/setup'

export async function getAll() {
  return await db.select().from(categories)
}
