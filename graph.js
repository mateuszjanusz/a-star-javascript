
//constuctor
function Graph(grid){
	this.grid = grid
	const nodes = []

	let row, row_count
	for(let x = 0; x < grid.length; ++x){
		row = grid[x]
		row_count = row.length
		nodes[x] = new Array(row_count)
		for(let y = 0; y < row_count; ++y){
			nodes[x][y] = new Node(x, y, row[y])
			console.log(nodes[x][y])
		}
	}

	this.nodes = nodes
}

function Node(x, y, type){
	this.label = ''
    this.x = x
    this.y = y
    this.pos = {x, y}
    this.type = type
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
            rowDebug += row[y++].type + " ";
        }
        graphString = graphString + rowDebug + "\n";
    }
    return graphString;
};

Node.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
};

module.exports = Graph