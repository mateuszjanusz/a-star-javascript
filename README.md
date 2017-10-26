# A* Search Algorithm 

## Description
A* algorithm is one of the most popular computer algorithm used in path-finding and graph traversals. It can be used to find a shortest path.
This algorithm is based on Dijkstra's algorithm with some characteristics of Breadth-First Search algorithm. A* also uses an heuristic function to estimate the cost of a path from node n to a goal and therefore to decide which path to follow.
<br><br>
Given starting point and a goal, the algorithm for each move, examines the vertex n that has the lowest `f(n) = g(n) + h(n)`  where `g(n)` is the cost of the path from the initial state to node n and `h(n)` is the heuristic cost of a path from node n to the goal.

## Usage
1. Clone the repository 
2. Open index.html in a browser
3. Set a grid size
4. Choose a grid type (square or diagonal)
5. Select start and goal node
6. Create obstacles by clicking on nodes
7. Press Start Search to run the algorithm

## Example
Green squares represent the shortest path found by the algorithm.

### Square Grid

<img src="https://github.com/mateuszjanusz/ai-coursework/blob/master/examples/square.png?raw=true" width="400">

### Diagonal Grid

<img src="https://github.com/mateuszjanusz/ai-coursework/blob/master/examples/diagonal.png?raw=true" width="400">


