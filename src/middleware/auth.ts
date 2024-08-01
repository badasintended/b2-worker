import * as gitignore from '@gerhobbelt/gitignore-parser'
import { basicAuth } from 'hono/basic-auth'
import { privateConfig } from '../config'
import { factory } from '../app'

const GUEST = '%GUEST%'

const passwords = Object.fromEntries(privateConfig.accounts.map(it => [it.username, it.password]))
const downloadRules = privateConfig.downloaders ? Object.fromEntries(privateConfig.downloaders.map(it => [it.username, it.rule])) : undefined

const compiledDownloadRules: Record<string, gitignore.Compiled> = {}
function getcompiledDownloadRule(username: string) {
  const rule = downloadRules![username]
  if (rule === undefined) return undefined

  let compiled = compiledDownloadRules[rule]
  if (compiled === undefined) {
    compiled = gitignore.compile(rule)
    compiledDownloadRules[rule] = compiled
  }
  return compiled
}

export const uploadAuth = basicAuth(
  privateConfig.accounts[0],
  ...privateConfig.accounts.slice(1),
)

const _downloadAuth = basicAuth({
  verifyUser: async (inUsername, inPassword, c) => {
    const password = passwords[inUsername]
    if (password === undefined) return false
    if (password !== inPassword) return false

    const path = c.req.path
    const rule = getcompiledDownloadRule(inUsername)
    if (rule && rule.denies(path)) return true

    return false
  },
})

export const downloadAuth = factory.createMiddleware(async (c, next) => {
  if (!privateConfig.downloaders) {
    await next()
    return
  }

  const path = c.req.path

  const guestRule = getcompiledDownloadRule(GUEST)
  if (guestRule && guestRule.denies(path)) {
    await next()
    return
  }

  await _downloadAuth(c, next)
})
