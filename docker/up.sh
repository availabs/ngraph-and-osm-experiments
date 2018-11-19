#!/bin/bash

set -e

pushd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null

docker-compose up overpass

popd >/dev/null
