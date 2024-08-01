import { cache as honoCache } from 'hono/cache'
import { config } from '../config'

export const directoryCache = cache(config.directoryCache)
export const fileCache = cache(config.fileCache)

export function cache(maxAge: number) {
  return honoCache({
    cacheName: 'b2-worker',
    cacheControl: `public, immutable, max-age=${maxAge}`,
  })
}
