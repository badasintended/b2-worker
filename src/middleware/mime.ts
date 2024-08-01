import { mimes as baseMimes, getMimeType } from 'hono/utils/mime'
import { factory } from '../app'
import { config } from '../config'

export const mimes = {
  ...baseMimes,
}

for (const [mime, extensions] of Object.entries(config.extraMimes)) {
  if (Array.isArray(extensions)) {
    for (const extension of extensions) {
      mimes[extension] = mime
    }
  } else {
    mimes[extensions] = mime
  }
}

export const mime = factory.createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('Content-Type', getMimeType(c.req.path, mimes) ?? 'application/octet-stream')
})
