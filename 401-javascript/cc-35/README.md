# Algorithm / Explanation

This is an undirected graph implementation in TypeScript using sets, based off of David's starter code and the assistance of Hugo

## Testing

npm i
&&
npm test to check if each test passes for the different methods

## Methods

1: addNode simply adds an input node to the set and returns the node
2: getNodes returns the set of all nodes
3: getNeighbors takes in a target node and returns a set of all its neighbors(and their circular connections)
4:  addEdge takes in a left node, right node, and edge value, and constructs edge connections between the two nodes.
5: size returns the set size. You could have also just used graph.size, given this is set based anyway.
