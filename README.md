# ngraph and osm experiments

## This README is currently just some rough notes.

Download the NYS data from here: [http://download.geofabrik.de/north-america/us/new-york.html](http://download.geofabrik.de/north-america/us/new-york.html)

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

* TODO

[how-to-get-all-roads-around-a-given-location-in-openstreetmap](https://stackoverflow.com/a/20323690)

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

Result
```
{
    "version": 0.6,
    "generator": "Overpass API 0.7.55 579b1eec",
    "osm3s": {
        "timestamp_osm_base": "",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "node",
            "id": 42421800,
            "lat": 40.7839788,
            "lon": -73.9703286,
            "tags": {
                "highway": "traffic_signals"
            }
        },
        {
            "type": "node",
            "id": 42424851,
            "lat": 40.7846108,
            "lon": -73.9698592,
            "tags": {
                "highway": "traffic_signals"
            }
        },
        {
            "type": "node",
            "id": 42427915,
            "lat": 40.7820374,
            "lon": -73.9717336,
            "tags": {
                "crossing": "traffic_signals",
                "highway": "traffic_signals"
            }
        },
        {
            "type": "node",
            "id": 42433564,
            "lat": 40.7827173,
            "lon": -73.9712566,
            "tags": {
                "highway": "traffic_signals"
            }
        },
        {
            "type": "node",
            "id": 42435308,
            "lat": 40.7833496,
            "lon": -73.9707906,
            "tags": {
                "highway": "traffic_signals"
            }
        },
        {
            "type": "node",
            "id": 1740700830,
            "lat": 40.7821477,
            "lon": -73.9716486,
            "tags": {
                "crossing": "zebra",
                "highway": "crossing"
            }
        },
        {
            "type": "node",
            "id": 3392519876,
            "lat": 40.7834203,
            "lon": -73.9707387,
            "tags": {
                "crossing": "zebra",
                "highway": "crossing"
            }
        },
        {
            "type": "node",
            "id": 3392519877,
            "lat": 40.7833039,
            "lon": -73.9708242,
            "tags": {
                "crossing": "zebra",
                "highway": "crossing"
            }
        },
        {
            "type": "way",
            "id": 46334664,
            "nodes": [
                42427915,
                1740700830,
                42433564
            ],
            "tags": {
                "bicycle": "yes",
                "cycleway:right": "lane",
                "hgv": "local",
                "highway": "secondary",
                "name": "Central Park West",
                "surface": "asphalt",
                "tiger:cfcc": "A41",
                "tiger:county": "New York, NY",
                "tiger:name_base": "Central Park",
                "tiger:name_direction_suffix": "W"
            }
        },
        {
            "type": "way",
            "id": 542215780,
            "nodes": [
                42433564,
                3392519877,
                42435308,
                3392519876,
                42421800,
                42424851
            ],
            "tags": {
                "bicycle": "yes",
                "cycleway:right": "lane",
                "hgv": "no",
                "highway": "secondary",
                "name": "Central Park West",
                "tiger:cfcc": "A41",
                "tiger:county": "New York, NY",
                "tiger:name_base": "Central Park",
                "tiger:name_direction_suffix": "W"
            }
        }
    ]
}
```

---

## References

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


