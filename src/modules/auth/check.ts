import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    const { payload } = await request.jwtDecode() as { payload: { id: number } }
    request.userMeta = { id: payload.id }
  }
  catch {
    return reply.status(401).send('Not authorized')
  }
}
