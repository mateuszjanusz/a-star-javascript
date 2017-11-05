
function dijkstra(graph, start, goal, is_diagonal) {

	const nodes = graph.nodes

	let open_list = []

	open_list.push(start)
	let closest = start

	while(open_list.length > 0){


		const current = open_list[open_list.length-1]
		// console.log("X Current position:", current.toString())

		if(current === goal){
			// console.log("\n Found the goal!")
			return getPath(current)
		}

		//remove current from open and mark node as closed 
		open_list = _.filter(open_list, (node) => node != current)
		current.closed = true

		//get current's neighbours
		const neighbours = getNeighbours(nodes, current, is_diagonal)
		// console.log(neighbours)
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
           	}

           	if(is_closest && (neighbour.g < current.g)){
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


function aStar(graph, start, goal, is_diagonal) {

	const nodes = graph.nodes

	let open_list = []

	open_list.push(start)
	let closest = start

	while(open_list.length > 0){

		//select the lowest f(x)
		const lowest_index = getLowest(open_list)
		const current = open_list[lowest_index]
		// console.log("X Current position:", current.toString())

		if(current === goal){
			// console.log("\n Found the goal!")
			return getPath(current)
		}

		//remove current from open and mark node as closed 
		open_list = _.filter(open_list, (node) => node != current)
		current.closed = true

		//get current's neighbours
		const neighbours = getNeighbours(nodes, current, is_diagonal)
		// console.log(neighbours)
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
           		neighbour.h = calcHeuristic(neighbour, goal, is_diagonal)
           		neighbour.f = neighbour.g + neighbour.h
           	}

           	if(is_closest && (neighbour.h < current.h || (neighbour.h === current.h && neighbour.g < current.g))){
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


function isObstacle(node){
	return node.is_obstacle
}

function getNeighbours(grid, node, is_diagonal){
	const neighbours = []
	const x = node.x
	const y = node.y

	//west
	if(grid[x-1] && grid[x-1][y] && !isObstacle(grid[x-1][y])){
		neighbours.push(grid[x-1][y])
	} 
	//east
	if(grid[x+1] && grid[x+1][y] && !isObstacle(grid[x+1][y])){
		neighbours.push(grid[x+1][y])
	} 
	//north
	if(grid[x][y-1] && !isObstacle(grid[x][y-1])){
		neighbours.push(grid[x][y-1])
	} 
	//south
	if(grid[x][y+1] && !isObstacle(grid[x][y+1])){
		neighbours.push(grid[x][y+1])
	}

//diagonal directions  								
if(is_diagonal){
	//north-west
    if (grid[x - 1] && grid[x - 1][y - 1] && !isObstacle(grid[x - 1][y - 1])) {
		neighbours.push(grid[x - 1][y - 1]);
    }
    //north-east
    if (grid[x + 1] && grid[x + 1][y - 1] && !isObstacle(grid[x + 1][y - 1])) {
		neighbours.push(grid[x + 1][y - 1]);
    }
    //south-west
    if (grid[x - 1] && grid[x - 1][y + 1] && !isObstacle(grid[x - 1][y + 1])) {
		neighbours.push(grid[x - 1][y + 1]);
    }
    //south-east
    if (grid[x + 1] && grid[x + 1][y + 1] && !isObstacle(grid[x + 1][y + 1])) {
		neighbours.push(grid[x + 1][y + 1]);
    }
}

	return neighbours
}

function calcHeuristic(a, b, is_diagonal){
//calculating manhattan distance
if(!is_diagonal){
	const d1 = Math.abs(b.x - a.x)
    const d2 = Math.abs(b.y - a.y)
    return d1 + d2
}
		
//calculating diagonal octile distance 
	const D1 = 1
	const D2 = Math.sqrt(2)
	const d1 = Math.abs(b.x - a.x)
	const d2 = Math.abs(b.y - a.y)
	return (D1 * (d1 + d2)) + ((D2 - (2 * D1)) * Math.min(d1, d2))
}

function getPath(node) {
	let curr = node
	const path = []
	while (curr.parent) {
		path.unshift(curr)
		curr = curr.parent
	}
	return path
}

function getLowest(list){
	let lowest_index = 0

	for(let i=0; i < list.length; i++) {
	    if(list[i].f < list[lowest_index].f) { 
	    	lowest_index = i
	    }
	}
    return lowest_index
}

