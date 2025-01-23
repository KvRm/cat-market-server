import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '../auth/check'
import { setupRoutes } from '../setup'
import { addProduct } from './services/add-product'
import { clear } from './services/clear'
import { getCurrent } from './services/get-current'

export async function setupCartsModule(app: FastifyInstance) {
  const routes = [
    {
      path: '/carts/current',
      handler: getCurrent,
      options: { onRequest: [authMiddleware] },
    },
    {
      path: '/carts/add-product',
      handler: addProduct,
      options: { onRequest: [authMiddleware] },
    },
    {
      path: '/carts/clear',
      handler: clear,
      options: { onRequest: [authMiddleware] },
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  setupRoutes(app, routes)
}
