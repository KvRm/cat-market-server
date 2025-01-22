import type { users } from '../../../db/schema/users'
import * as dal from '../dal'

export async function create(params: typeof users.$inferInsert) {
  return await dal.createOne(params)
}
