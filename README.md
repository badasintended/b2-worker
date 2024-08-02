# B2 Worker

B2 Worker is a front-end for private Backblaze B2 storage using Cloudflare Worker

## Features

- Directory Listing
- File upload API via `PUT` method
- File uploader form at `/uploader`
- Basic authentication and authorization
- Prevent direct bucket access
- Serve content from B2 bucket for free from Cloudflare's CDN

## Demo

**[maven4.bai.lol](https://maven4.bai.lol)**

I used this project to host a directory listing for the Maven server for my Minecraft mods.    
The `PUT` API is also for easy Maven publishing.

## Setup

0. I'm using [asdf](https://asdf-vm.com/) to manage Node and PNPM, you can install it or install PNPM yourself
1. Run `curl -L https://bai.lol/b2-worker | bash`, the source [here](script/init.sh)
1. `pnpm install`
1. In Backblaze, create a new Application Key, with only access to **single** bucket
1. Fill out `config/config.ts`
1. You need to also put at least a username and password pair
1. In Cloudflare Dashboard, create a new KV Namespace
1. Fill out `wrangler.toml`, copy the KV id there
1. `pnpm run deploy`
1. Add custom domain to the worker and disable the `workers.dev` route (to enable response caching)
1. `git add . && git push` to your private repository

## TODO

- File deletion

## References

- https://www.backblaze.com/apidocs/introduction-to-the-b2-native-api
- https://github.com/phistrom/cf-b2cdn
- https://github.com/iBug/cf-b2cdn
- https://github.com/cmj2002/r2-dir-list
