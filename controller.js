angular.module('astar', [])
   .controller('astarController', function($scope) {
		$scope.setupGrid = function(){
			const grid = [
			/*  |0|1|2|3|4|5| */
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			]
			$scope.graph = new Graph(grid)
			$scope.all_nodes = _.flatten($scope.graph.nodes)
			$scope.start_node = $scope.all_nodes[0]
			$scope.goal_node = $scope.all_nodes[$scope.all_nodes.length-1]
			$scope.is_diagonal = false
			$scope.path = []
		}



		$scope.setupGrid()

		$scope.startSearch = function(){
			$scope.path = search($scope.graph, $scope.start_node, $scope.goal_node)
			console.log($scope.path)
		}

		$scope.isStartNode = function(node){
			return node === $scope.start_node
		}
		$scope.isGoalNode = function(node){
			return node === $scope.goal_node
		}
		$scope.isPathNode = function(node){
			return $scope.path.includes(node)
		}

	
		
		function search(graph, start, goal) {

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
					console.log("\n Found the goal!")
					return getPath(current)
				}

				//remove current from open and mark node as closed 
				open_list = _.filter(open_list, (node) => node != current)
				current.closed = true

				//get current's neighbours
				const neighbours = getNeighbours(nodes, current)

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
	               		neighbour.h = calcHeuristic(neighbour, goal)
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

		function getNeighbours(grid, node){
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

		//diagonal directions  								
		if($scope.is_diagonal){
			//north-west
		    if (grid[x - 1] && grid[x - 1][y - 1]) {
				neighbours.push(grid[x - 1][y - 1]);
		    }
		    //north-east
		    if (grid[x + 1] && grid[x + 1][y - 1]) {
				neighbours.push(grid[x + 1][y - 1]);
		    }
		    //south-west
		    if (grid[x - 1] && grid[x - 1][y + 1]) {
				neighbours.push(grid[x - 1][y + 1]);
		    }
		    //south-east
		    if (grid[x + 1] && grid[x + 1][y + 1]) {
				neighbours.push(grid[x + 1][y + 1]);
		    }
		}

			return neighbours
		}

		function calcHeuristic(a, b){
		//calculating manhattan distance
		if(!$scope.is_diagonal){
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
	       		curr.label = 'x'
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



	    //Graph constuctor
		function Graph(grid){
			this.grid = grid
			const nodes = []
			let row, col, col_count
			grid.forEach((row, i) => {
				col_count = row.length
				nodes[i] = new Array(row.length)
				for(let j = 0; j < col_count; j++){
					nodes[i][j] = new Node(j, i)
				}
			})

			this.nodes = nodes
		}

		//single Node constructor
		function Node(x, y){
			this.label = 'o'
			this.display = '['+x+','+y+']'
		    this.x = x
		    this.y = y
			this.f = 0
			this.g = 0
			this.h = 0
			this.closed = false
			this.parent = null
		}
});