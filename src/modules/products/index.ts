import type { FastifyInstance } from 'fastify'

import { setupRoutes } from '../setup'
import { getAll } from './services/get-all'

export async function setupProductsModule(app: FastifyInstance) {
  const routes = [
    {
      path: '/products/all',
      handler: getAll,
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  setupRoutes(app, routes)
}
