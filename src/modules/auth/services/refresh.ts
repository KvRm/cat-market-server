import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  if (!request.cookies.refreshToken)
    return reply.status(401).send('Not authorized')

  const refreshToken = request.cookies.refreshToken

  let tokenDecoded = {}
  jwt.verify(refreshToken, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err)
      return reply.status(401).send('Not authorized')
    tokenDecoded = decoded as { id: number }
  })

  const { id } = tokenDecoded as { id: number }

  const accessToken = jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: '10h' })
  const newRefreshToken = jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: '5d' })

  return reply.setCookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  }).send({ accessToken })
}
