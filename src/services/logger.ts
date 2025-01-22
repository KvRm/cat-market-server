import type { FastifyInstance } from 'fastify'
import type pino from 'pino'

// eslint-disable-next-line import/no-mutable-exports
export let logger = {} as pino.BaseLogger

export function setupLogger(app: FastifyInstance) {
  logger = app.log
}
