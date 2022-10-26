class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  preOrder = (root) => root ? [root.value, ...this.preOrder(root.left), ...this.preOrder(root.right)] : [];
}
class BinaryTree {
  constructor(root) {
    this.root = root;
  }
  preOrder() {
    return this.root.preOrder(this.root);
  }
}

function treeIntersection(bt1, bt2) {
  const matches = [];
  const map = new Map();
  const btArr1 = bt1.preOrder();
  const btArr2 = bt2.preOrder();
  for (const item of btArr1) {
    map.set(item);
  };
  for (const item of btArr2) {
    if (map.has(item)) {
      matches.push(item);
    }
  }
  return matches;
}
module.exports = { Node, BinaryTree, treeIntersection };