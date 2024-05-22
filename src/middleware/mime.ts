import { mimes as baseMimes, getMimeType } from 'hono/utils/mime'
import { factory } from '../app'

export const mimes = {
  ...baseMimes,
  pom: baseMimes.xml,
}

export const mime = factory.createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('Content-Type', getMimeType(c.req.path, mimes) ?? 'application/octet-stream')
})
