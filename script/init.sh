#!/usr/bin/env bash

UPSTREAM="https://github.com/badasintended/b2-worker"

read -e -p 'Repository name: ' repo_name </dev/tty
if [[ -z "${repo_name// }" ]]; then
	echo "Needs a repo name"
	exit 1
fi

read -e -p 'New origin remote repository (MUST BE PRIVATE): ' remote_origin </dev/tty
if [[ -z "${remote_origin// }" ]]; then
	echo "Needs a repo origin"
	exit 1
fi

git clone "$UPSTREAM" "$repo_name"

cd "$repo_name"
git remote set-url origin "$remote_origin"
git remote add upstream "$UPSTREAM"
git remote set-url --push upstream PUSH_TO_UPSTREAM_IS_DISALLOWED

rm .gitignore
mv .gitignore.private .gitignore

cp ./config/config.example.ts ./config/config.ts
cp ./wrangler.example.toml ./wrangler.toml

echo "proceed to the next step"
