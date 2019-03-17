var cols, rows;
var w = 10;
var grid = [];
var stack = []
var current;

function setup() {
    createCanvas(400, 400);
    frameRate(60)
    cols = floor(width/w) // floor used so only INTs
    rows = floor(height/w)    
    
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < rows; i++) {
            grid.push(new Cell(i, j));
        }
    }

    current = grid[0]
}

function draw() {
    background(51)
    
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    current.visited = true;
    current.highlight()
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        
        stack.push(current);
        // Remove walls inbetween current and next
        removeWalls(current, next);
        
        
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1;
    }
    return i + (j * cols);
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false; // a's left wall removed
        b.walls[1] = false; // b's right wall removed
   
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    
    if (y === 1) {
        a.walls[0] = false; 
        b.walls[2] = false; 

    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
