import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import { setupDb } from './db/setup'
import { setupAuthModule } from './modules/auth'
import { setupCategoriesModule } from './modules/categories'
import { setupProductsModule } from './modules/products'
import { setupUserModule } from './modules/user'
import { setInitialData } from './scripts/set-initial-data'
import { setupLogger } from './services/logger'
import { generateUuid } from './utils/generate-uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function build(opts = {}) {
  const app = fastify(opts)

  app.register(fastifyCors, {
    origin: process.env.NODE_ENV === 'development' ? [/localhost/] : [],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  app.register(fastifyCookie)
  app.register(fastifyJwt, {
    secret: process.env.SECRET_KEY as string,
    decode: { complete: true },
  })
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  })

  setupLogger(app)
  await setupDb()

  setupUserModule(app)
  setupAuthModule(app)
  setupCategoriesModule(app)
  setupProductsModule(app)

  await setInitialData()

  app.setGenReqId(() => generateUuid())

  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403)
      return err.message
    }
    request.log.error({ err })
    reply.code(err.statusCode || 500)

    return 'There was an error processing your request.'
  })

  return app
}
