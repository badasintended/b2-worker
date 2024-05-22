export type PublicConfig = {
  siteName: string
  uploader: boolean
  apiRefreshTime: number
  directoryCache: number
  fileCache: number
}

export type PrivateConfig = {
  accounts: Record<string, string>
  b2: {
    keyId: string
    key: string
  }
}

export function FILLME(): never {
  throw new Error('FILLME')
}
