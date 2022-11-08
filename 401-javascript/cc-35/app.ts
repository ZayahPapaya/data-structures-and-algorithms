

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

  bread = (loaf: Set<Node<NV, EV>>): any => {
    let visited: any = new Set();
    let result = [];
    let queue: any = [];
    if (loaf.size > 0) {
      const iter = loaf.values();
      queue.push(iter.next().value);
    } else {
      return result;
    }


    while (queue.length > 0) {
      let current: Node<NV, EV> = queue.shift();
      console.log('current node', current)
      if (visited.has(current.value)) {
        console.log('continue')
        continue;
      } else {
        visited.add(current.value);
      }
      console.log('edges', current)
      if (current.edges.length > 0) {
        current.edges.forEach(edge => {
          edge.nodes.forEach(node => {
            queue.push(node)
          })
        })
      }
    }
    visited.forEach((item: any) => {
      result.push(item.name);
    })
    return result;
  }
}





