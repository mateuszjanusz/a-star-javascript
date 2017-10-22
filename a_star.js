const _ = require('lodash')

const a_star = {

	getNeighbours(grid, node){
		const neighbours = []
		const x = node.x
		const y = node.y

		//north
		if(grid[y-1] && grid[y-1][x]){
			neighbours.push(grid[y-1][x])
		} 
		//south
		if(grid[y+1] && grid[y+1][x]){
			neighbours.push(grid[y+1][x])
		} 
		//east
		if(grid[y][x-1] && grid[y][x-1]){
			neighbours.push(grid[y][x-1])
		} 
		//west
		if(grid[y][x+1] && grid[y][x+1]){
			neighbours.push(grid[y][x+1])
		}

	//diagon directions  <-- uncomment for diagonal
		// //north-west
	 //    if (grid[x - 1] && grid[x - 1][y - 1]) {
		// 	neighbours.push(grid[x - 1][y - 1]);
	 //    }
	 //    //north-east
	 //    if (grid[x + 1] && grid[x + 1][y - 1]) {
		// 	neighbours.push(grid[x + 1][y - 1]);
	 //    }
	 //    //south-west
	 //    if (grid[x - 1] && grid[x - 1][y + 1]) {
		// 	neighbours.push(grid[x - 1][y + 1]);
	 //    }
	 //    //south-east
	 //    if (grid[x + 1] && grid[x + 1][y + 1]) {
		// 	neighbours.push(grid[x + 1][y + 1]);
	 //    }

		return neighbours
	},

	calcHeuristic(a, b){
	//calculating manhattan distance
 		const d1 = Math.abs(b.x - a.x)
        const d2 = Math.abs(b.y - a.y)
        return d1 + d2
    //calculating diagonal octile distance  <-- uncomment for diagonal
		// const D1 = 1
		// const D2 = Math.sqrt(2)
		// const d1 = Math.abs(b.x - a.x)
		// const d2 = Math.abs(b.y - a.y)
		// return (D1 * (d1 + d2)) + ((D2 - (2 * D1)) * Math.min(d1, d2))
	},

	getPath(node) {
		let curr = node
		const path = []
		while (curr.parent) {
			path.unshift(curr)
			curr = curr.parent
       		curr.label = 'x'
		}
		return path
	},

	getLowest(list){
		let lowest_index = 0

		for(let i=0; i < list.length; i++) {
		    if(list[i].f < list[lowest_index].f) { 
		    	lowest_index = i
		    }
		}
        return lowest_index
	},


	search: function(graph, start, goal) {
		const nodes = graph.nodes
		start.label = 'S'
		goal.label = 'G'
		console.log("\nGRAPH")
		console.log('Goal:', goal.toString())
		console.log(graph.toString())

		let open_list = []

		console.log("\Starting from initial node:", start.toString(), '\n')
		open_list.push(start)
		let closest = start

		while(open_list.length > 0){

			//select the lowest f(x)
			const lowest_index = a_star.getLowest(open_list)
			const current = open_list[lowest_index]
			console.log("X Current position:", current.toString())

			if(current === goal){
				console.log("\n Found the goal!")
				return a_star.getPath(current)
			}

			//remove current from open and mark node as closed 
			open_list = _.filter(open_list, (node) => node != current)
			current.closed = true

			//get current's neighbours
			const neighbours = a_star.getNeighbours(nodes, current)

			console.log("Neighbours", neighbours.length)
			// _.forEach(neighbours, (n) => console.log(n.toString()))

			for(let i=0; i < neighbours.length; i++) {
                const neighbour = neighbours[i]

                if(neighbour.closed) { 
                    // neighbour was visited, skip to next neighbour
                    continue
                }

                // calculate g score
               	const g_score = current.g + 1 // 1 is the distance from current node to its neighbour
               	let is_closest = false

               	const was_visited = neighbour.closed

               	if(!was_visited || g_score < neighbour.g){
               		
               		if(closest != start){
	               		neighbour.closed = true
               		}

               		is_closest = true
					
               		neighbour.parent = current
               		neighbour.g = g_score
               		neighbour.h = a_star.calcHeuristic(neighbour, goal)
               		neighbour.f = neighbour.g + neighbour.h
               	}

               	if(is_closest && (neighbour.h < current.h || (neighbour.h === current.h && neighbour.g < current.g))){
               		// console.log('neighbour', neighbour.toString())
               		// console.log("current closest", "F: " + closest.f + " G: " + closest.g + " H: " + closest.h)
               		console.log("> New closest", neighbour.toString())
	              	closest = neighbour
               	}

               	if(!was_visited){
               		open_list.push(neighbour)
               	} 
            }           
		}

		//path not found, failed
        return []

	}

}

module.exports = a_star