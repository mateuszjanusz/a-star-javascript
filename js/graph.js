//Graph constuctor
function Graph(grid){
	this.grid = grid
	const nodes = []
	let row, col, col_count
	grid.forEach((row, i) => {
		col_count = row.length
		nodes[i] = new Array(row.length)
		for(let j = 0; j < col_count; j++){
			if(row[j]>0){
				nodes[i][j] = new Node(i, j, true)
			} else {
				nodes[i][j] = new Node(i, j, false)
			}
		}
	})

	this.nodes = nodes
}

//single Node constructor
function Node(x, y, is_obstacle){
	this.is_obstacle = is_obstacle
    this.x = x
    this.y = y
    this.pos = { x: y, y: x }
	this.display = '['+this.pos.x+','+this.pos.y+']'
	this.f = 0
	this.g = 0
	this.h = 0
	this.closed = false
	this.parent = null
}