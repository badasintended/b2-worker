import { cache as honoCache } from 'hono/cache'
import { publicConfig } from '../config'

export const directoryCache = cache(publicConfig.directoryCache)
export const fileCache = cache(publicConfig.fileCache)

export function cache(maxAge: number) {
  return honoCache({
    cacheName: 'b2-worker',
    cacheControl: `public, immutable, max-age=${maxAge}`,
  })
}
