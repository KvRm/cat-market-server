import type { FastifyReply, FastifyRequest } from 'fastify'
import * as dal from '../dal'

export async function getCurrent(request: FastifyRequest, reply: FastifyReply) {
  const { id: userId } = request.userMeta
  const cart = await dal.getOneWithProducts({ userId })
  if (!cart)
    return reply.status(404).send(null)
  return cart
}
