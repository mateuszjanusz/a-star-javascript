const graphlib = require('graphlib')
const Graph = require('graphlib').Graph
const _ = require('lodash')



// function getPath(node) {
// 	if (g.parent(node) !== undefined) {
// 		const current_path = getPath(g.parent(node))
// 		current_path.push(node)
// 		return current_path
// 	} else {
// 		//it's first node
// 		return node
// 	}
// }


function aStar(graph, start, goal){
	// console.log(graphlib.json.write(graph))
	const getManhattanDistance = function(node1, node2){
		const d1 = Math.abs(node1 - node2)
		const d2 = Math.abs(graph.node(node1) - graph.node(node2))
		return d1 + d2
	}

	const getWeight = function(start, end){
		return graph.edge(start, end)
	}

	const getPath = function(node) {
		let current = node
		const path = []
		if(!graph.parent(current)){
			console.log("this is first node")
			return node
		}
		while(graph.parent(current)){
			path.unshift(current)
			current = graph.parent(current)
		}
		return path
	}

	const open_list = []
	const closed_list = []

	let g, h, f
	/*
		g - is the shortest distance from start to current node
		h - 
		f - 
	*/

	start.h = getManhattanDistance(start, goal)
	let closest = start

	open_list.push(start)

	while(open_list.length > 0){
		console.log(open_list)

		//get last node from unvisited nodes
		const current_node = open_list.pop()

		if(current_node === goal){
			console.log("goal is the start point")
			return getPath(current_node)
		}

		//move the current node from unvisited list to visited
		closed_list.push(current_node)

		//get all neighbours of the current node
		const neighbours = graph.neighbors(current_node)
		console.log("neighbours:", neighbours)

		neighbours.forEach((neighbour) => {
			if(closed_list.includes(neighbour)){
				console.log("neighbour visited", neighbour)
				return
			}

			if(!open_list.includes(neighbour)){
				open_list.push(neighbour)
			}

			g = getWeight(current_node, neighbour)
			neighbour.g = g
			console.log("cost:", g)

			if(neighbour.g > closest.g){
				return
			} else {
				neighbour.h = getManhattanDistance(neighbour, goal)
				neighbour.f = neighbour.g + neighbour.h

				if(neighbour.h < closest.h || (neighbour.h === closest.h && neighbour.g < closest.g)){
	          		closest = neighbour
					console.log("new closest neighbour:", closest)
				}

			}

		})

		if(closest){
			const final_path = getPath(current_node)
			console.log("======== RESULT ========")
			console.log("Shortest path from", start,"to",goal)
			console.log(final_path.reverse().toString())
			return final_path
		}

		console.log("Path not found.")
		return []

	}

}



// SETUP A NEW GRAPH

const g = new Graph({ 
	compound: true,
	directed: false,
})
// const g = new Graph({ directed: false })

g.setGraph("A STAR");
const nodes_count = 4

const nodes = [...new Array(nodes_count)].map((index) => index)
let random 
nodes.forEach((value, node) => {
	g.setNode(node, value)

	//set an edge and parent 
	const weight = ((Math.random() * nodes_count)+1).toFixed(0)
	// const start = ((Math.random() * nodes_count)+1).toFixed(0)
	random = ((Math.random() * nodes_count)+1).toFixed(0)
	console.log("setting edge from node", node, 'to node', random, 'with weight:', weight)
	g.setEdge(node, random, weight)
	// g.setParent(node, node-1)
})
random = ((Math.random() * nodes_count)+1).toFixed(0)
g.setEdge(0, random)


// console.log(g.graph())
// console.log(g.nodeCount())
// console.log(g.edgeCount())
// console.log(g.edge(1, 2))
// console.log(g.edge(2, 1))
// console.log(g.nodes())
// console.log(g.parent(2))

//print all edges
// console.log(g.edges())
//edges that leave node X
// console.log(g.outEdges(1))
// edges enter and leave the node X
// console.log(g.nodeEdges(1))
// console.log(g.node(3))
console.log(graphlib.json.write(g))

aStar(g, 2, 3)
