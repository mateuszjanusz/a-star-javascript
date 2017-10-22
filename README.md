# A* Search Algorithm 

## Description
A* algorithm is one of the most popular computer algorithm used in path-finding and graph traversals. It can be used to find a shortest path.
This algorithm is based on Dijkstra's algorithm with some characteristics of Breadth-First Search algorithm. A* also uses an heuristic function to estimate the cost of a path from node n to a goal and therefore to decide which path to follow.
<br><br>
Given starting point and a goal, the algorithm for each move, examines the vertex n that has the lowest `f(n) = g(n) + h(n)`  where `g(n)` is the cost of the path from the initial state to node n and `h(n)` is the heuristic cost of a path from node n to the goal.

## Usage
1. Make sure you have Node installed by running `node -v`.
2. In index.js, setup your grid, start position and the goal. 
3. Run in the cli:
```
yarn
node index.js
```
   **NOTE:** To use diagonal grid, you need to uncomment code in a_star.js

| Square Grid  | Diagonal Grid |
| ------------- | ------------- |
| ![](https://github.com/mateuszjanusz/ai-coursework/blob/master/examples/square.png?raw=true)  | ![](https://github.com/mateuszjanusz/ai-coursework/blob/master/examples/diagonal.png?raw=true)  |