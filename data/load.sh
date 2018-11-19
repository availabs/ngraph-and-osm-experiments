#!/bin/bash 

set -e
set -a

source ../config/postgres.env

osm2pgsql ./new-york-latest.osm.bz2 -S default.style --hstore
