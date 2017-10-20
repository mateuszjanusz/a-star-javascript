// const graphlib = require('graphlib')
// const Graph = require('graphlib').Graph
const _ = require('lodash')
const Astar = require('./a_star')
const Graph = require('./graph')


const grid = [
	[1,1,1,1],
	[0,1,1,0],
	[0,0,1,1]
]

const graph = new Graph(grid)
const start = graph.nodes[0][0]
const end = graph.nodes[1][2]

console.log("GRAPH")
console.log(graph.toString())

const result = Astar.search(graph.nodes, start, end)
console.log(result)


