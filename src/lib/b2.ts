// Response Types

import { tfetch } from './tfetch'

export type ErrorResponse = {
  status: number
  code: string
  message: string
}

// ---
// b2_authorize_account
// https://www.backblaze.com/apidocs/b2-authorize-account

const AUTHORIZE_URL = 'https://api.backblazeb2.com/b2api/v3/b2_authorize_account'

export type AuthorizeAccountResponse = {
  accountId: string
  authorizationToken: string

  apiInfo: {
    storageApi: {
      apiUrl: string
      bucketId: string
      bucketName: string
      downloadUrl: string
    }
  }
}

export async function authorizeAccount(keyId: string, key: string) {
  const auth = btoa(`${keyId}:${key}`)
  const res = await tfetch<AuthorizeAccountResponse>(AUTHORIZE_URL, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cf: {
      cacheTtl: 12 * 60 * 60,
      cacheEverything: true,
    },
  })

  return res
}

// ---
// b2_list_file_names
// https://www.backblaze.com/apidocs/b2-list-file-names

const LIST_FILE_NAMES_ENDPOINT = '/b2api/v3/b2_list_file_names'

export type ListFileNamesRequest = {
  startFileName?: string
  maxFileCount?: number
  prefix?: string
  delimiter?: string
}

export type ListFileNamesResponse = {
  files: Array<{
    accountId: string
    action: 'start' | 'upload' | 'hide' | 'folder'
    contentLength: number
    contentType: string
    fileId: string
    fileName: string
    uploadTimestamp: number
  }>

  nextFileName: string | null
}

export async function listFileNames(auth: AuthorizeAccountResponse, req: ListFileNamesRequest = {}) {
  const res = await tfetch<ListFileNamesResponse>(auth.apiInfo.storageApi.apiUrl + LIST_FILE_NAMES_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': auth.authorizationToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bucketId: auth.apiInfo.storageApi.bucketId,
      ...req,
    }),
  })

  return res
}

// ---
// download file

export async function downloadFile(auth: AuthorizeAccountResponse, file: string) {
  const { downloadUrl, bucketName } = auth.apiInfo.storageApi
  const url = `${downloadUrl}/file/${bucketName}/${file}`

  return tfetch(url, {
    headers: {
      Authorization: auth.authorizationToken,
    },
  })
}

// ---
// b2_get_upload_url
// https://www.backblaze.com/apidocs/b2-get-upload-url

const GET_UPLOAD_URL_ENDPOINT = '/b2api/v3/b2_get_upload_url'

export type GetUploadUrlResponse = {
  uploadUrl: string
  authorizationToken: string
}

export async function getUploadUrl(auth: AuthorizeAccountResponse) {
  const { apiUrl, bucketId } = auth.apiInfo.storageApi

  return tfetch<GetUploadUrlResponse>(apiUrl + GET_UPLOAD_URL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': auth.authorizationToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bucketId }),
  })
}

// ---
// b2_upload_file
// https://www.backblaze.com/apidocs/b2-upload-file

export async function uploadFile(auth: GetUploadUrlResponse, fileName: string, length: number, body: ReadableStream) {
  const encodedFileName = encodeURIComponent(fileName)

  return tfetch(auth.uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': auth.authorizationToken,
      'Content-Type': 'b2/x-auto',
      'Content-Length': `${length}`,
      'X-Bz-File-Name': encodedFileName,
      'X-Bz-Content-Sha1': 'do_not_verify',
    },
    body,
  })
}
