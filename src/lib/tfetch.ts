import type { StatusCode } from 'hono/utils/http-status'

export type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
  status: StatusCode
  json: () => Promise<T>
}

export type TypedFetch = <T>(...a: Parameters<typeof fetch>) => Promise<TypedResponse<T>>

export const tfetch = fetch as TypedFetch
