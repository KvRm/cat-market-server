import type { FastifyReply, FastifyRequest } from 'fastify'
import * as dal from '../dal'

export async function clear(request: FastifyRequest, reply: FastifyReply) {
  const { id: userId } = request.userMeta
  const isSuccess = await dal.clear({ userId })

  if (!isSuccess)
    return reply.status(500).send('Не удалось очистить в корзину')
}
