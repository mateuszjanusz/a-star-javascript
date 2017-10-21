// const graphlib = require('graphlib')
// const Graph = require('graphlib').Graph
const _ = require('lodash')
const Astar = require('./a_star')
const Graph = require('./graph')


const grid = [
	[1,1,1,1,0,1],
	[0,1,1,0,0,1],
	[0,0,1,1,0,1],
	[0,1,0,1,0,1],
	[0,1,0,1,0,1]
]

const graph = new Graph(grid)
const start = graph.nodes[1][1]
const goal = graph.nodes[4][1]
start.label = 'S'
goal.label = 'G'

console.log("GRAPH")
console.log(graph.toString())

// console.log("START")
console.log(start)
// console.log("GOAL")
console.log(goal)

const result = Astar.search(graph, start, goal)
console.log("SHORTEST PATH:")
// console.log(result)
_.forEach(result, (node, index)=>{
	index = index+1
	console.log('step ' + index, node.pos)
})


