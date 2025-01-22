import type { FastifyRequest } from 'fastify'
import type { users } from '../../../db/schema/users'
import * as dal from '../dal'

export async function update(request: FastifyRequest) {
  const params = request.body as typeof users.$inferInsert & { id: number }

  return await dal.updateOne(params)
}
