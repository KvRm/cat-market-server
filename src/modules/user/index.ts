import { fastify, type FastifyInstance } from 'fastify'

import { authMiddleware } from '../auth/check'

import { setupRoutes } from '../setup'
import { current } from './services/current'
import { update } from './services/update'

export async function setupUserModule(app: FastifyInstance) {
  const routes = [
    {
      path: '/user/current',
      handler: current,
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      options: { onRequest: [authMiddleware] },
    },
    {
      path: '/user/update',
      handler: update,
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      options: { onRequest: [authMiddleware] },
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  setupRoutes(app, routes)
}
