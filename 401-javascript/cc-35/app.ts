import { continueStatement } from "@babel/types";
import { captureRejectionSymbol } from "events";


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

export interface Door {
  id: number;
  status: 'locked' | 'unlocked';
  color: 'red' | 'green' | 'blue' | undefined;
}

export interface Room {
  id: number;
  contents: 'key' | 'treasure' | undefined;
  color: 'red' | 'green' | 'blue' | undefined;
}

export class Graph<NV, EV> {
  nodes: Set<Node<NV, EV>>;
  constructor() {
    this.nodes = new Set();
  }
  addNode = (value: NV): Node<NV, EV> => {
    let node: Node<NV, EV> = {
      value,
      edges: []
    }
    this.nodes.add(node);
    return node;
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
    let result: any = [];
    let queue: any = [];
    if (loaf.size > 0) {
      const iter = loaf.values();
      queue.push(iter.next().value);
    } else {
      return result;
    }


    while (queue.length > 0) {
      let current: Node<NV, EV> = queue.shift();
      if (visited.has(current.value)) {
        continue;
      } else {
        visited.add(current.value);
      }
      if (current.edges.length > 0) {
        current.edges.forEach(edge => {
          edge.nodes.forEach(node => {
            queue.push(node)
          })
        })
      }
    }
    visited.forEach((item: any) => result.push(item))
    return result;
  }

  // businessTrip = (route: Node<string, number>[]): number | null => {
  //   let tracker: any = Array.from(this.nodes).find((city: any) => city === route[0]);
  //   if (!tracker) return null;
  //   let cost: number = 0;
  //   let visited: any = new Set();
  //   let queue: any = [];
  //   while (queue.length > 0) {
  //     let current: Node<string, number> = queue.shift();
  //     if (visited.has(current.value)) continue;
  //     visited.add(current.value);
  //     if (current.edges.length > 0) {
  //       current.edges.forEach(edge => {
  //         edge.nodes.forEach(node => {
  //           if (route.find(element => element.value === node.value)) {
  //             queue.push(node);
  //             cost = edge.value + cost;
  //           }
  //         })
  //       })
  //     }
  //   }
  //   return cost;
  // }

}

export const businessTrip = (graph: Graph<string, number>, route: Node<string, number>[]): number | null => {
  let cost = 0;
  let tracker = route.shift()!;
  while (route.length > 0) {
    let neighbors = graph.getNeighbors(tracker);
    let next = route.shift()!;
    console.log(next)
    console.log(neighbors)
    if (!neighbors.has(next)) return null;
    cost += tracker.edges.find((edge: Edge<string, number>) => edge.nodes[1] === next)?.value ?? 0;
    tracker = next;
  }
  return cost;
}

export const solveMaze = (start: Node<Room, Door>): boolean => {
  let stack: Node<Room, Door>[] = [start];
  let visited: any = new Set();
  let keys: any = new Set();
  let treasure: boolean = false;
  while (stack.length > 0) {
    let current: Node<Room, Door> = stack.pop()!;
    if (visited.has(current.value)) continue;
    if (current.value.contents === 'key') {
      keys.add(current.value.color!)
    };
    if (current.value.contents === 'treasure') {
      treasure = true;
      break;
    }
    visited.add(current.value);
    if (current.edges.length > 0) {
      current.edges.forEach(edge => {
        if (edge.value.status === 'locked' && keys.has(edge.value.color)) {
          stack.push(edge.nodes[1]);
        } else if (edge.value.status === 'unlocked') {
          stack.push(edge.nodes[1]);
        }
      })
    }
  }
  return treasure
}


