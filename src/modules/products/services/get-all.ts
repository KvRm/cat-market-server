import type { FastifyRequest } from 'fastify'
import * as dal from '../dal'

export async function getAll(request: FastifyRequest) {
  return await dal.getAll(request.body as { search?: string, categories?: number[] })
}
