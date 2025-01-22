import closeWithGrace from 'close-with-grace'
import dotenv from 'dotenv'
import { build } from './app'

dotenv.config()

const opts: {
  logger: {
    level: string
    transport?: { target: string }
  }
} = {
  logger: {
    level: 'info',
  },
}

// We want to use pino-pretty only if there is a human watching this,
// otherwise we log as newline-delimited JSON.
if (process.stdout.isTTY) {
  opts.logger.transport = { target: 'pino-pretty' }
}

const port = Number(process.env.PORT) || 2222
const host = process.env.HOST || '127.0.0.1'

build(opts).then((app) => {
  console.log(app.printRoutes())
  app.listen({ port, host })

  closeWithGrace(async ({ err }) => {
    if (err) {
      app.log.error({ err }, 'server closing due to error')
    }
    app.log.info('shutting down gracefully')
    await app.close()
  })
})
