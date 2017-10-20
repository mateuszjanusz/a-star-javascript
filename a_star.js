const a_star = {
	setup: function(grid){
		for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
            	const node = grid[x][y]
                node.f = 0
                node.g = 0
                node.h = 0
                node.visited = false
                node.closed = false
                node.debug = ""
                node.parent = null
            }
        }
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

	getNeighbours(grid, node){
		const neighbours = []
		const x = node.x
		const y = node.y

		if(grid[x-1] && grid[x-1][y]){
			neighbours.push(grid[x-1][y])
		} else if(grid[x+1] && grid[x+1][y]){
			neighbours.push(grid[x+1][y])
		} else if(grid[x][y-1] && grid[x][y-1]){
			neighbours.push(grid[x][y-1])
		} else if(grid[x][y+1] && grid[x][y+1]){
			neighbours.push(grid[x][y+1])
		}

		return neighbours
	},

	calcHeuristic(a, b){
		//calculating manhattan distance
	 		const d1 = Math.abs(a.x - b.x)
	        const d2 = Math.abs(a.y - b.y)
        return d1 + d2
	},

	search: function(grid, start, goal) {
		a_star.setup(grid)
		start.label = 'START Node'
		goal.label = 'GOAL Node'
		// console.log(grid.nodes)
		const open_list = []
		open_list.push(start)
		let closest = start
		console.log("open list:", open_list)

		while(open_list.length > 0){


			//select the lowest f(x)
			const lowest_index = a_star.getLowest(open_list)

			const current = open_list[lowest_index]
			console.log("current", current)
			if(current === goal){
				// return getPath(current) //TO do: write getPath function
				console.log(">>>>>> found path", current, goal)
				return
			}
			console.log("looking for goal..")
			
			//move current from open to closed
			// open_list.remove(lowest_index)

			open_list.shift()
			current.closed = true

			const neighbours = a_star.getNeighbours(grid, current)

			console.log(neighbours)
			for(let i=0; i < neighbours.length; i++) {
                const neighbour = neighbours[i]

                // if(neighbour.closed || neighbour.isWall()) { 
                if(neighbour.closed) { 
                    // skip to next neighboir
                    console.log("SKIPPING")
                    continue
                }

                // calculate g score
               	const g_score = current.g + 1 // 1 is the distance from current node to its neighbour
               	let is_closest = false

               	const was_visited = neighbour.visited
               	// neighbour unvisited
               	if(!was_visited|| g_score < neighbour.g){
               		is_closest = true
					
					neighbour.visited = true
               		neighbour.parent = current
               		neighbour.g = g_score
               		neighbour.h = a_star.calcHeuristic(neighbour.pos, goal.pos)
               		neighbour.f = neighbour.g + neighbour.h

               		open_list.push(neighbour)
               	}

               	if(is_closest){
               		neighbour.debug = "F: " + neighbour.f + " G: " + neighbour.g + " H: " + neighbour.h
               		console.log(neighbour.debug)
               		if (neighbour.h < closest.h || (neighbour.h === closest.h && neighbour.g < closest.g)) {
	               		console.log("new closest")
		              	closest = neighbour
		            }
               	}

               	if(!was_visited){
               		open_list.push(neighbour)
               	} 



            }
            if(closest){
				console.log("return path to closest here", closest)
				console.log("the same as start? ", closest === start)   		
				return
           	}

            return []

		}

	}

}


module.exports = a_star