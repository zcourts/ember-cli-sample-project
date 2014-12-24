#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}/server
command -v nodemon >/dev/null 2>&1 || { echo >&2 "nodemon required, not found, installing..."; npm install -g nodemon; }
npm install && nodemon  --debug ./bin/www -w "*"
