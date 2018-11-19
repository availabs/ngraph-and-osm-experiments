echo "$POSTGRES_USER"
echo "$POSTGRES_PASSWORD"

osm2pgrouting \
  --file ./new-york-latest.osm \
  --conf mapconfig.xml \
  --dbname osm \
  --username "$POSTGRES_USER" \
  --password "$POSTGRES_PASSWORD" \
  --addnodes \
  --clean

