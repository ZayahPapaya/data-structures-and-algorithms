

export interface Node<NV, EV> {
  value: NV;
  edges: Edge<NV, EV>[];
}

export interface Edge<NV, EV> {
  value: EV;
  nodes: [Node<NV, EV>, Node<NV, EV>];
}

export interface Item {
  name: string;
}

export interface Location {
  name: string;
}

export class Graph<NV, EV> {
  nodes: Set<Node<NV, EV>>;
  constructor() {
    this.nodes = new Set();
  }
  addNode = (value: Node<NV, EV>): Node<NV, EV> => {
      this.nodes.add(value);
      return value;
  }
  getNodes = (): Set<Node<NV, EV>> => {
    return this.nodes
  }

  getNeighbors = (value: Node<NV, EV>): Set<Node<NV, EV>> => {
    return new Set(value.edges.map((edge) => edge.nodes[1]));
  }

  addEdge = (left: Node<NV, EV>, right: Node<NV, EV>, edge: EV): void => {
    const neighbor: Edge<NV, EV> = {
      value: edge,
      nodes: [left, right],
    }
    left.edges.push(neighbor);
    right.edges.push(neighbor)
  
  }
  size = (): number => {
    return this.nodes.size;
  }
}





