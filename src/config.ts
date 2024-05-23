import publicConfig from '../config/public'
import privateConfig from '../config/private'

export type PublicConfig = {
  siteName: string
  uploader: boolean
  apiRefreshTime: number
  directoryCache: number
  fileCache: number
  extraMimes: Record<string, string>
}

export type PrivateConfig = {
  accounts: Array<{
    username: string
    password: string
  }>

  b2: {
    keyId: string
    key: string
  }
}

export {
  publicConfig,
  privateConfig,
}
