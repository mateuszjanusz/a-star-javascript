
//constuctor
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

function Node(x, y){
	this.label = 'o'
    this.x = x
    this.y = y
    this.pos = {x, y}
	this.f = 0
	this.g = 0
	this.h = 0
	this.closed = false
	this.parent = null
    // this.type = type
}


//////////////////////////////
Graph.prototype.toString = function() {
    var graphString = "\n";
    var nodes = this.nodes;
    var rowDebug, row, y, l;
    for (var x = 0, len = nodes.length; x < len;) {
        rowDebug = "";
        row = nodes[x++];
        for (y = 0, l = row.length; y < l;) {
            rowDebug += row[y++].label + " ";
        }
        graphString = graphString + rowDebug + "\n";
    }
    return graphString;
};

Node.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
};

module.exports = Graph