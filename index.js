const _ = require('lodash')
const Astar = require('./a_star')
const Graph = require('./graph')

const grid = [
/*  |0|1|2|3|4|5| */
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0]
]

const graph = new Graph(grid)

const start = graph.nodes[1][1] // <- set start node here
const goal = graph.nodes[4][3]	// <- set goal node

const shortest_path = Astar.search(graph, start, goal)


console.log("\n The Shortest Path is:")
_.forEach(shortest_path, (node, index)=>{
	index = index+1
	console.log('\ step ' + index + ':', node.toString())
})
console.log("\n Path on the graph:")
console.log(graph.toString())


