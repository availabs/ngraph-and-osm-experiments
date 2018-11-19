const request = require('./request');
const endpoint = 'static/'
const createGraph = require('ngraph.graph');
const BBox = require('../BBox');

const asyncFor = require('rafor');

module.exports = loadPositions;


// const HIGHWAY_TYPES = [
  // 'link',
  // 'motorway',
  // 'motorway_link',
  // 'primary',
  // 'primary_link',
  // 'residential',
  // 'secondary',
  // 'secondary_link',
  // 'service',
  // 'tertiary',
  // 'tertiary_link',
  // 'trunk',
  // 'trunk_link',
  // 'unclassified',
// ]

const HIGHWAY_TYPES = [
  'motorway',
  'motorway_link',
  'primary',
  'primary_link',
  'secondary',
  'secondary_link',
]

const HW_QUERY = HIGHWAY_TYPES.join('%7C')

const OVERPASS_HOST = 'http://overpass-api.de'
const RADIUS = 25000

// const OVERPASS_HOST = 'http://localhost:8000'
// const RADIUS = 550000

// http://overpass-turbo.eu/s/DMo
const reqString = `${OVERPASS_HOST}/api/interpreter?data=%5Bout%3Ajson%5D%3Bway%5B%22highway%22%7E%22${HW_QUERY}%22%5D%28around%3A${RADIUS}%2C42%2E6526%2C%2D73%2E7562%29%3B%28%2E_%3B%3E%3B%29%3Bout%3B%0A`

function loadPositions(fileName, progress) {
  let graph = createGraph();
  let coordinates = []
  let dx
  let dy
  let points = [];
  let links = []
  let graphBBox = new BBox();

  let _nodes = []
  let _links = []

  let seq = 0
  const idMappings = {}

  const parseResponse = (d) =>
    new Promise(resolve => {
      asyncFor(d.elements, e => {
        if (e.type === 'node') {
          coordinates.push({ x: e.lon, y: -e.lat })
          _nodes.push(e)
        }
        if (e.type === 'way') {
          _links.push(e)
        }
      }, resolve)
    })

  const computeDs = () =>
    new Promise(resolve => {
      let minX = Number.POSITIVE_INFINITY;
      let maxX = Number.NEGATIVE_INFINITY;
      let minY = Number.POSITIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;

      asyncFor(coordinates, ({x, y}) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }, () => {
        dx = (maxX + minX) / 2;
        dy = (maxY + minY) / 2;
        resolve()
      })
    })

  const addNodesToGraph = () => 
    new Promise(resolve => {
      asyncFor(_nodes, ({ id, lat, lon}) => {
        const x = +lon - dx
        const y = -+lat -dy
        idMappings[id] = seq++
        graph.addNode(idMappings[id], { x, y })
        graphBBox.addPoint(x, y);
        points.push(x, y)
      }, () => {
        progress.pointsReady = true
        resolve()
      })
    })

  const addLinksToGraph = () =>
    new Promise(resolve => {
      asyncFor(_links, ({ nodes }) => {
        for (let i = 0; i < nodes.length -1; ++i) {
          const fromId = idMappings[nodes[i]]
          const toId = idMappings[nodes[i + 1]]
          graph.addLink(fromId, toId);
          links.push(fromId, toId)
        }
      }, () => {
        progress.linksReady = true
        resolve()
      })
    })


  console.time('OVERPASS REQ')
  return request(reqString, { responseType: 'json' })
    .then(d => {
      console.timeEnd('OVERPASS REQ')
      return Promise.resolve(d)
    })
    .then(parseResponse)
    .then(computeDs)
    .then(addNodesToGraph)
    .then(addLinksToGraph)
    .then(() => ({graph, graphBBox, points, links }))
}
