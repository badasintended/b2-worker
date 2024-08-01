import config from '../config/config'

export type Config = {
  b2: {
    keyId: string
    key: string
  }
  siteName: string
  listing: boolean
  uploader: boolean
  accounts: Array<{
    username: string
    password: string
  }>
  downloaders: Array<{
    username: string
    rule: string
    listing?: boolean
  }> | undefined
  apiRefreshTime: number
  directoryCache: number
  fileCache: number
  extraMimes: Record<string, string | string[]>
}

export {
  config,
}
