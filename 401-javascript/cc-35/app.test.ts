import { Node, Edge, Item, Location, Graph } from "./app";

let dhammer: Node<Item, Location> = {
  value: { name: 'Dragon Warhammer' },
  edges: [],
}

let gmaul: Node<Item, Location> = {
  value: { name: 'Granite Maul' },
  edges: [],
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

});

let pandora: Node<Item, Location> = {
  value: { name: 'Pandora' },
  edges: [],
}

let arendelle: Node<Item, Location> = {
  value: { name: 'Arendelle' },
  edges: [],
}

let metroville: Node<Item, Location> = {
  value: { name: 'Metroville' },
  edges: [],
}

let monstropolis: Node<Item, Location> = {
  value: { name: 'Monstropolis' },
  edges: [],
}

let narnia: Node<Item, Location> = {
  value: { name: 'Narnia' },
  edges: [],
}

let naboo: Node<Item, Location> = {
  value: { name: 'Naboo' },
  edges: [],
}

let graph2 = new Graph<Item, Location>();

describe('A graph', () => {
  graph2.addNode(pandora)
  graph2.addNode(arendelle)
  graph2.addNode(metroville)
  graph2.addNode(monstropolis)
  graph2.addNode(narnia)
  graph2.addNode(naboo)
  graph2.addEdge(pandora, arendelle, {name: 'edge'})
  graph2.addEdge(arendelle, metroville, {name: 'edge'})
  graph2.addEdge(arendelle, monstropolis, {name: 'edge'})
  graph2.addEdge(metroville, monstropolis, {name: 'edge'})
  graph2.addEdge(metroville, narnia, {name: 'edge'})
  graph2.addEdge(metroville, naboo, {name: 'edge'})
  graph2.addEdge(monstropolis, naboo, {name: 'edge'})
  graph2.addEdge(narnia, naboo, {name: 'edge'})

  it('Breads', () => {
    expect(graph2.bread(graph2.getNodes())).toEqual(["Pandora", "Arendelle", "Metroville", "Monstropolis", "Narnia", "Naboo"])
  })
});