angular.module('astar', [])
   .controller('astarController', function($scope) {
   		$scope.grid_sizes = [[3,3], [4,4], [5,5], [6,6], [7,7], [8,8], [9,9]]
		$scope.grid_size = [6,6]

		$scope.setupGrid = function(grid_size){
			const num_rows = grid_size[0]
			const num_columns = grid_size[1]
			const grid = []

			for(let i = 0; i < num_columns; i++) {
			    grid[i] = new Array(num_rows);
			}

			$scope.graph = new Graph(grid)
			$scope.all_nodes = _.flatten($scope.graph.nodes)
			$scope.start_node = $scope.all_nodes[0]
			$scope.goal_node = $scope.all_nodes[$scope.all_nodes.length-1]
			$scope.is_diagonal = false
			$scope.path_not_found = false
			$scope.start_is_goal = false
			$scope.path = []
			$scope.error = ''
			$scope.result = ''
			$scope.is_dijkstra = false
		}



		$scope.setupGrid($scope.grid_size)
		
		$scope.updateGridSize = function(){
			$scope.setupGrid($scope.grid_size)
		}

		$scope.startSearch = function(){
			if($scope.start_node === $scope.goal_node){
				$scope.start_is_goal = true
				return
			}
			$scope.message = ''
			if($scope.is_dijkstra){
				$scope.path = dijkstra($scope.graph, $scope.start_node, $scope.goal_node, $scope.is_diagonal)
			} else {
				$scope.path = aStar($scope.graph, $scope.start_node, $scope.goal_node, $scope.is_diagonal)

			}
			if(!$scope.path.length){
				$scope.path_not_found = true
			} 
		}

		$scope.setObstacle = function(node){
			node.is_obstacle = !node.is_obstacle 
		}

		$scope.formatSize = function(grid_size){
   			return grid_size[0] + 'x' + grid_size[1]
   		}

		$scope.isObstacle = function(node){
			return node.is_obstacle
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

	
	    
})