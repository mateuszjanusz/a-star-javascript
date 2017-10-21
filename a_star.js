const _ = require('lodash')

const a_star = {

	getLowest(list){
		let lowest_index = 0

		for(let i=0; i < list.length; i++) {
            if(list[i].f < list[lowest_index].f) { 
            	lowest_index = i
            }
        }
        return lowest_index
	},

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

		return neighbours
	},

	getPath(node) {
		let curr = node;
		const path = [];
		while (curr.parent) {
			path.unshift(curr)
			curr = curr.parent
		}
		return path
	},

	calcHeuristic(a, b){
		//calculating manhattan distance
	 		const d1 = Math.abs(a.x - b.x)
	        const d2 = Math.abs(a.y - b.y)
        return d1 + d2
	},

	search: function(graph, start, goal) {
		const nodes = graph.nodes
		let open_list = []

		open_list.push(start)
		let closest = start

		while(open_list.length > 0){

			//select the lowest f(x)
			const lowest_index = a_star.getLowest(open_list)

			const current = open_list[lowest_index]
			console.log("CURRENT", current.pos)


			// console.log(current)
			if(current === goal){
				// return getPath(current) //TO do: write getPath function
				console.log(">>>>>> found shortest path")
				return a_star.getPath(current)
			}
			console.log("looking for goal..")

			//remove current from open and mark as closed closed
			open_list = _.filter(open_list, (node) => node != current)
			current.closed = true

			const neighbours = a_star.getNeighbours(nodes, current)

			// console.log("NEIGHBOURS")
			// _.forEach(neighbours, (n) => console.log(n.pos))

			for(let i=0; i < neighbours.length; i++) {
                const neighbour = neighbours[i]

                // if(neighbour.closed || neighbour.isWall()) { 
                if(neighbour.closed) { 
                    // neighbour was visited, skip to next neighbour
                    console.log("SKIPPING")
                    continue
                }

                // calculate g score
               	const g_score = current.g + 1 // 1 is the distance from current node to its neighbour
               	let is_closest = false

               	const was_visited = neighbour.closed

               	if(!was_visited || g_score < neighbour.g){
               		
               		if(closest != start){
   						current.label = 'v'
	               		neighbour.closed = true
               		}

               		is_closest = true
					
               		neighbour.parent = current
               		neighbour.g = g_score
               		neighbour.h = a_star.calcHeuristic(neighbour, goal)
               		neighbour.f = neighbour.g + neighbour.h
               	}

               	if(is_closest){
               		neighbour.debug = "F: " + neighbour.f + " G: " + neighbour.g + " H: " + neighbour.h
               		console.log("IS CLOSEST? :")
               		console.log('neighbour', neighbour.pos, neighbour.debug)
               		console.log("current closest", "F: " + closest.f + " G: " + closest.g + " H: " + closest.h)
					
               		if (neighbour.h < current.h || (neighbour.h === current.h && neighbour.g < current.g)) {
	               		console.log("new closest")
		              	closest = neighbour
               			// closest.label = '*'
						console.log(graph.toString())
		            }
               	}

               	// console.log("was visited", was_visited)
               	if(!was_visited){
               		// console.log("adding")
               		open_list.push(neighbour)
               	} 



            }
           

		}

		if(closest && (closest != start)){
        	const shortest_path = a_star.getPath(closest)
        	console.log("=======DONE=======")
			console.log("the same as start? ", closest === start)
			return shortest_path
       	}

        return []

	}

}


module.exports = a_star