import { Node, Edge, Item, Location, Graph, businessTrip, solveMaze, Room, Door } from "./app";

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
// export interface Door {
//   id: number;
//   status: 'locked' | 'unlocked';
//   color: 'red' | 'green' | 'blue' | undefined;
// }

// export interface Room {
//   id: number;
//   contents: 'key' | 'treasure' | undefined;
//   color: 'red' | 'green' | 'blue' | undefined;
// }
let maze = new Graph<Room, Door>();
describe('A solvable maze!', () => {
  const start = maze.addNode({ id: 1, contents: undefined, color: undefined });
  const middle = maze.addNode({ id: 2, contents: undefined, color: undefined });
  const keyRoom = maze.addNode({ id: 3, contents: 'key', color: 'blue' });
  const treasureRoom = maze.addNode({ id: 4, contents: 'treasure', color: undefined });

  maze.addEdge(start, middle, { id: 5, status: 'unlocked', color: undefined });
  maze.addEdge(middle, treasureRoom, { id: 6, status: 'locked', color: 'blue' });
  maze.addEdge(start, keyRoom, { id: 7, status: 'unlocked', color: undefined });

  it('Wins the maze', () => {
    expect(solveMaze(start)).toBe(true);
  });
});

let maze2 = new Graph<Room, Door>();
describe('A not solvable maze :c', () => {
  const start = maze2.addNode({ id: 1, contents: undefined, color: undefined });
  const middle = maze2.addNode({ id: 2, contents: 'key', color: 'blue' });
  const keyRoom = maze2.addNode({ id: 3, contents: undefined, color: undefined });
  const treasureRoom = maze2.addNode({ id: 4, contents: 'treasure', color: undefined });

  maze2.addEdge(start, middle, { id: 5, status: 'locked', color: 'blue' });
  maze2.addEdge(middle, treasureRoom, { id: 6, status: 'unlocked', color: undefined });
  maze2.addEdge(start, keyRoom, { id: 7, status: 'unlocked', color: undefined });

  it('Loses the maze', () => {
    expect(solveMaze(start)).toBe(false);
  })
})