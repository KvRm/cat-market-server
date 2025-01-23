import type { FastifyReply, FastifyRequest } from 'fastify'
import * as dal from '../dal'

export async function addProduct(request: FastifyRequest, reply: FastifyReply) {
  const { id: userId } = request.userMeta
  const { productId, count } = request.body as { productId: number, count: number }
  const isSuccess = await dal.addProduct({ userId, productId, count })

  if (!isSuccess)
    return reply.status(500).send('Не удалось добавить в корзину')
}
