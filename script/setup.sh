#!/usr/bin/env bash

UPSTREAM="https://github.com/badasintended/b2-worker"

git remote add upstream "$UPSTREAM"
git remote set-url --push upstream PUSH_TO_UPSTREAM_IS_DISALLOWED
