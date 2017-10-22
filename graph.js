
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
    this.x = x
    this.y = y
	this.f = 0
	this.g = 0
	this.h = 0
	this.closed = false
	this.parent = null
}

// Print functions
Graph.prototype.toString = function() {
    let graph_string = "\n"
    const nodes = this.nodes
    var row_label, row, y
    for (let x = 0; x < nodes.length; x++) {
        row_label = "  "
        row = nodes[x]
        for (y = 0; y < row.length; y++) {
            row_label += row[y].label + " "
        }
        graph_string += row_label + "\n"
    }
    return graph_string
};

Node.prototype.toString = function() {
    return "[" + this.x + "," + this.y + "]"
}

module.exports = Graph