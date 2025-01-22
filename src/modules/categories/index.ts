import type { FastifyInstance } from 'fastify'

import { setupRoutes } from '../setup'
import { getAll } from './services/get-all'

export async function setupCategoriesModule(app: FastifyInstance) {
  const routes = [
    {
      path: '/categories/all',
      handler: getAll,
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  setupRoutes(app, routes)
}
