import type { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'

export type Handler = (request: FastifyRequest, reply: FastifyReply,) => Promise<Response> | Response

export interface Route {
  path: string
  handler: Handler
  options?: RouteShorthandOptions
}

export function setupRoutes(fastify: FastifyInstance, routes: Array<Route>) {
  routes.forEach(({ path, options = {}, handler }) => {
    fastify.post(path, options, (request, reply) => handler(request, reply))
  })
}
