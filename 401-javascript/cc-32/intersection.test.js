const { BinaryTree, Node, treeIntersection } = require('./app');

  describe('binary tree', () => {
    const tree1 = new BinaryTree(
      new Node(
        150,
        new Node(100, new Node(75), new Node(160, new Node(125), new Node(175))),
        new Node(250, new Node(200), new Node(350, new Node(300), new Node(500)))
      )
    );
    const tree2 = new BinaryTree(
      new Node(
        42,
        new Node(100, new Node(15), new Node(160, new Node(125), new Node(175))),
        new Node(600, new Node(200), new Node(350, new Node(4), new Node(500)))
      )
    );
    it('intersects the trees', () => {
      expect(treeIntersection(tree1, tree2)).toEqual([100, 160, 125, 175, 200, 350, 500])
    })
  })