# ngraph and osm experiments

## This README is currently just some rough notes.

---

## ngraph.path.demo

[ngraph.path.demo](https://github.com/anvaka/ngraph.path.demo)

Modified src/lib/loadGraph.js to receive data directly from overpass.

#### Instructions

```
cd ngraph.path.demo/
npm install
npm start
```

NOTE: the project is currently set configured to use http://overpass-api.de

---

### Running an Overpass server

[docker-overpass-api](https://github.com/Frankkkkk/docker-overpass-api)

NOTE: I modified the docker-overpass-api repo's files.

#### Instructions

##### Get the data

```
curl 'http://download.geofabrik.de/north-america/us/new-york-latest.osm.bz2' > docker/host_mnt/new-york-latest.osm.bz2
```

##### Build the overpass-api image

```
cd docker/docker-overpass-api
docker build -t overpass_api .
```

##### Start the Overpass API Server

WARNING: Currently, this will run init_osm3s.sh every time you create a new container.

```
cd ../
mkdir -p host_mnt/overpass_DB
docker run -it --restart=always -v "${PWD}/host_mnt/":/host_mnt -v "${PWD}/host_mnt/overpass_DB:/overpass_DB" -p 8000:80 overpass_api
```

#### Test it out

Query:
```
[out:json];
way
  (around:100, 40.7831,-73.9712)
  ["highway"~"trunk|secondary"];
(
  ._;
  >;
);
out body;
```

[\[out:json\];way\["highway"~"trunk|secondary"\]\(around:100,40.7831,-73.9712\);\(._;>;\);out;](http://localhost:8000/api/interpreter?data=%5Bout%3Ajson%5D%3Bway%5B%22highway%22~%22trunk%7Csecondary%22%5D%28around%3A100%2C40%2E7831%2C-73%2E9712%29%3B%28%2E_%3B%3E%3B%29%3Bout%3B%0A)


---

## Potentially Useful References

---

### Loading the data into PGRouting.

https://pgrouting.org/docs/tools/osm2pgrouting.html
https://raw.githubusercontent.com/pgRouting/osm2pgrouting/master/mapconfig.xml

https://github.com/Starefossen/docker-pgrouting
https://hub.docker.com/r/starefossen/pgrouting

Fails because osm2pgrouting runs out of memory: [issue](https://github.com/pgRouting/osm2pgrouting/issues/20)

```
sudo apt-get install osm2pgrouting
```

---

### Loading the data into Postgres.

[loading_osm_postgis](https://www.bostongis.com/PrinterFriendly.aspx?content_name=loading_osm_postgis)

```
sudo apt-get install osm2pgsql
```


