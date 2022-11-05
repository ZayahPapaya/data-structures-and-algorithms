import { Node, Edge, Item, Location, Graph } from "./app";

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

let graph = new Graph<Item, Location>();
describe('A graph', () => {

  it('Adds nodes', () => {
    let a = graph.addNode(dhammer);
    let b = graph.addNode(gmaul);
    expect(a).toBe(dhammer);
    expect(b).toBe(gmaul);
  })

  it('Builds edges', () => {
    graph.addEdge(dhammer, gmaul, {name: 'Wilderness'})
    expect(dhammer.edges.length).toBe(1)
    expect(dhammer.edges[0].value.name).toBe('Wilderness')
  })

  it('Graphs neighbors', () => {
    expect(graph.getNeighbors(gmaul).size).toEqual(1);
  });

  it('Graphs everything', () => {
    expect(graph.getNodes().has(dhammer)).toEqual(true)
  });
  it('Has a size', () => {
    expect(graph.size()).toBe(2);
  });

})