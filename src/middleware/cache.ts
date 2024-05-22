import { cache as honoCache } from 'hono/cache'

export function cache(maxAge: number) {
  return honoCache({
    cacheName: 'b2-worker',
    cacheControl: `public, immutable, max-age=${maxAge}`,
  })
}
