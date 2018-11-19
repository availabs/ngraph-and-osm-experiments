#!/bin/bash

source conf.sh

# Kill all background processes on exit
trap "exit" INT TERM
trap "kill 0" EXIT

"$BINDIR/init_osm3s.sh" /host_mnt/new-york-latest.osm.bz2 "$DBDIR" "$EXECDIR"

echo "Will run dispatcher"
$BINDIR/dispatcher --osm-base --meta --db-dir=$DBDIR &
sleep 5 #In case

while true; do
	sleep 2000;
done
