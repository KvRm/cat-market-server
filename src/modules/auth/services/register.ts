import type { FastifyRequest } from 'fastify'
import type { users } from '../../../db/schema/users'
import { sha256 } from 'js-sha256'
import { create as createUser } from '../../user/services/create'

export async function register(request: FastifyRequest) {
  const params = request.body as typeof users.$inferInsert

  const user = {
    ...params,
    password: sha256(params.password),
  }

  await createUser(user)
}
