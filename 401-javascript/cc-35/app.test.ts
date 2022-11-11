import { Node, Edge, Item, Location, Graph, businessTrip } from "./app";

let dhammer: Node<Item, Location> = {
  value: { name: 'Dragon Warhammer' },
  edges: [],
}

let gmaul: Node<Item, Location> = {
  value: { name: 'Granite Maul' },
  edges: [],
}

let graph = new Graph<string, string>();
describe('A graph', () => {
  let a;
  let b;
  it('Adds nodes', () => {
    a = graph.addNode('Dragon Warhammer');
    b = graph.addNode('Granite Maul');
    expect(a.value).toBe('Dragon Warhammer');
    expect(b.value).toBe('Granite Maul');
  })

  it('Builds edges', () => {
    graph.addEdge(a, b, 'Wilderness')
    expect(a.edges.length).toBe(1)
    expect(a.edges[0].value).toBe('Wilderness')
  })

  it('Graphs neighbors', () => {
    expect(graph.getNeighbors(a).size).toEqual(1);
  });

  it('Graphs everything', () => {
    expect(graph.getNodes().has(a)).toEqual(true)
  });
  
  it('Has a size', () => {
    expect(graph.size()).toBe(2);
  });

});

let graph2 = new Graph<string, number>();

describe('A graph', () => {
  const pandora = graph2.addNode('Pandora')
  const arendelle = graph2.addNode('Arendelle')
  const metroville = graph2.addNode('Metroville')
  const monstropolis = graph2.addNode('Monstropolis')
  const narnia = graph2.addNode('Narnia')
  const naboo = graph2.addNode('Naboo')
  graph2.addEdge(pandora, arendelle, 150)
  graph2.addEdge(arendelle, metroville, 82)
  graph2.addEdge(arendelle, monstropolis, 42)
  graph2.addEdge(metroville, monstropolis, 105)
  graph2.addEdge(metroville, narnia, 37)
  graph2.addEdge(metroville, naboo, 26)
  graph2.addEdge(monstropolis, naboo, 73)
  graph2.addEdge(narnia, naboo, 250)

  it('Breads', () => {
    expect(graph2.bread(graph2.nodes)).toEqual(["Pandora", "Arendelle", "Metroville", "Monstropolis", "Narnia", "Naboo"])
  })
  
  it('Does trips', () => {
    expect(businessTrip(graph2, [metroville, pandora])).toBe(82)
    expect(businessTrip(graph2, [arendelle, monstropolis, naboo])).toBe(115)
  })

  it(`Doesn't do trips`, () => {
    expect(businessTrip(graph2, [naboo, pandora])).toBe(null)
    expect(businessTrip(graph2, [narnia, arendelle, naboo])).toBe(null)
  })
});
// businessTrip is O(n * e) time and O(1) space