const graphlib = require('graphlib')
const Graph = require('graphlib').Graph
const _ = require('lodash')

// const g = new Graph()
const g = new Graph({ directed: false })

g.setGraph("A STAR");

const nodes = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


nodes.forEach((value, node) => {
	g.setNode(node, value)

	if(node>0){
		const edge_length = ((Math.random() * 10)+1).toFixed(0)
		// console.log("setting edge from node", node-1, 'to node', node, 'with length:', edge_length)
		g.setEdge(node-1, node, edge_length)
	}
})



// console.log(g.graph())
// console.log(g.nodeCount())
// console.log(g.edgeCount())
// console.log(g.edge(1, 2))
// console.log(g.edge(2, 1))
// console.log(g.nodes())

//print all edges
// console.log(g.edges())
//edges that leave node X
// console.log(g.outEdges(1))
// edges enter and leave the node X
// console.log(g.nodeEdges(1))

console.log(graphlib.json.write(g))

