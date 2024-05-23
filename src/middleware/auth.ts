import { basicAuth } from 'hono/basic-auth'
import { privateConfig } from '../config'

export const auth = basicAuth(
  privateConfig.accounts[0],
  ...privateConfig.accounts.slice(1),
)
