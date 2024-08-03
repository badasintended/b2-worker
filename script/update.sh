#!/usr/bin/env bash

if [[ -n $(git status --porcelain) ]]; then
    echo "repo is dirty, commit it first"
    exit 1
fi

git fetch upstream
git merge upstream/master -m 'Update upstream'
pnpm run deploy
git add .
git push origin
