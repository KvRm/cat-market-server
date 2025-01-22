import type { FastifyInstance } from 'fastify'

import { setupRoutes } from '../setup'

import { login } from './services/login'
import { refresh } from './services/refresh'
import { register } from './services/register'

export async function setupAuthModule(app: FastifyInstance) {
  const routes = [
    {
      path: '/auth/register',
      handler: register,
    },
    {
      path: '/auth/login',
      handler: login,
    },
    {
      path: '/auth/refresh',
      handler: refresh,
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  setupRoutes(app, routes)
}
