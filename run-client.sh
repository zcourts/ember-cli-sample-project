#!/bin/sh
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}/client

npm install && bower install && ember build --output-path="../server/public/app" --watch --environment development
