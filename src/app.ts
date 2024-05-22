import { createFactory } from 'hono/factory'

export type Env = {
  Bindings: {
    KV: KVNamespace
  }
}

export const factory = createFactory<Env>()
