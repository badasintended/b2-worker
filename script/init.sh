#!/usr/bin/env bash

UPSTREAM="https://github.com/badasintended/b2-worker"

read -p 'Repository name: ' repo_name
read -p 'New origin remote repository (MUST BE PRIVATE): ' remote_origin

git clone "$UPSTREAM" "$repo_name"

cd "$repo_name"
git remote set-url origin "$remote_origin"
git remote add upstream "$UPSTREAM"

rm .gitignore
mv .gitignore.private .gitignore

cp ./config/config.example.ts ./config/config.ts
cp ./wrangler.example.toml ./wrangler.toml

echo "proceed to the next step"
