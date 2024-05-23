import { factory } from '../app'
import { privateConfig, publicConfig } from '../config'
import { authorizeAccount } from '../lib/b2'
import type { MemoryAuthorizeAccountResponse } from '../memory'
import { memory } from '../memory'

export const b2Auth = factory.createMiddleware(async (c, next) => {
  if (memory.auth === undefined || isAuthStale(memory.auth)) {
    const authStr = await c.env.KV.get('auth')
    const authKv = authStr !== null ? JSON.parse(authStr) as MemoryAuthorizeAccountResponse : null

    if (authKv === null || isAuthStale(authKv)) {
      const response = await authorizeAccount(privateConfig.b2.keyId, privateConfig.b2.key)
      const auth = await response.json()

      memory.auth = {
        accountId: auth.accountId,
        authorizationToken: auth.authorizationToken,
        apiInfo: {
          storageApi: {
            apiUrl: auth.apiInfo.storageApi.apiUrl,
            bucketId: auth.apiInfo.storageApi.bucketId,
            bucketName: auth.apiInfo.storageApi.bucketName,
            downloadUrl: auth.apiInfo.storageApi.downloadUrl,
          },
        },
        timestamp: Date.now(),
      }

      c.env.KV.put('auth', JSON.stringify(memory.auth))
    } else {
      memory.auth = authKv
    }
  }

  await next()
})

function isAuthStale(auth: MemoryAuthorizeAccountResponse) {
  const seconds = (Date.now() - auth.timestamp) / 1000
  return Number.isNaN(seconds) || seconds < 0 || seconds >= publicConfig.apiRefreshTime
}
