

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

let dhammer: Node<Item, Location> = {
  value: { name: 'Dragon Warhammer' },
  edges: [],
}

let gmaul: Node<Item, Location> = {
  value: { name: 'Granite Maul' },
  edges: [],
}

let wilderness: Edge<Item, Location> = {
  value: { name: 'Wilderness' },
  nodes: [dhammer, gmaul],
}

let pk: Edge<Item, Location> = {
  value: { name: 'PvP' },
  nodes: [gmaul, dhammer],
}

export const neighbors = (origin: Node<Item, Location>): Set<Node<Item, Location>> => {
  return new Set(origin.edges.map((edge) => edge.nodes[1]));
}