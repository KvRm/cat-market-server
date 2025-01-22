import type { FastifyReply, FastifyRequest } from 'fastify'
import { sha256 } from 'js-sha256'
import jwt from 'jsonwebtoken'

import { logger } from '../../../services/logger'

import { getEntityByLogin as getUserEntity } from '../../user/services/get-entity-by-login'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const params = request.body as { login: string, password: string }

  const user = await getUserEntity({ login: params.login })
  logger.info(user)
  if (!user || user.password !== sha256(params.password))
    return reply.status(422).send('Неверный логин или пароль')

  const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '10h' })
  const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '5d' })

  return reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  }).send({ accessToken })
}
