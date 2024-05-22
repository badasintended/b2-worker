import type { AuthorizeAccountResponse } from './lib/b2'

export type MemoryAuthorizeAccountResponse = AuthorizeAccountResponse & {
  timestamp: number
}

/**
 * Save some KV call by saving it on memory.
 * https://community.cloudflare.com/t/workers-global-variables/121123/11
 */
export const memory = {} as {
  auth?: MemoryAuthorizeAccountResponse
}

export const cfCache = caches.default
