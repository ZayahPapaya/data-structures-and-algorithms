import { Node, Edge, Item, Location,  neighbors } from "./app";

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


describe('A graph', () => {
  
  it('Graphs things', () => {
    dhammer.edges.push(wilderness, pk);
    gmaul.edges.push(pk)
    expect(neighbors(gmaul)).toEqual(new Set([dhammer]));
  })

})