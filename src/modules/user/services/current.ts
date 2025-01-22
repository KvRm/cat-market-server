import type { FastifyRequest } from 'fastify'
import * as dal from '../dal'

export async function current(request: FastifyRequest) {
  return await dal.getOne(request.userMeta)
}
