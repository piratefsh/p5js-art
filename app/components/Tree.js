class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = Node.ID_COUNTER++;
  }

  addLeft(child) {
    this.left = child;
  }

  addRight(child) {
    this.right = child;
  }

  isLeaf() {
    return !(this.left || this.right);
  }

  setValue(newValue) {
    this.value = newValue;
  }

  toString() {
    if (this.value.left) {
      return `${this.value.left.id} - ${this.value.right.id}`;
    }
    return this.value.id;
  }

  print(indent='') {
    console.log(indent, this.toString());

    if (this.left) {
      this.left.print(indent + ' ');
    }
    if (this.right) {
      this.right.print(indent + ' ');
    }
    
  }
}

Node.ID_COUNTER = 0;

export default class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertLeaf(site) {
    const leaf = new Node(site);

    if (this.root === null) {
      this.root = leaf;
      return;
    }

    let parent = this.root;
    let curr = this.root;
    while (!curr.isLeaf()) {
      // find side that it is closer to
      const diffLeft = Math.abs(curr.value.left.x - leaf.value.x);
      const diffRight = Math.abs(curr.value.right.x - leaf.value.x);

      if (diffLeft > diffRight) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }

      parent = curr;
    }

    const oldParentVal = parent.value;
    const parentArcLeft = new Node(oldParentVal);
    const parentArcRight = new Node(oldParentVal);

    parent.setValue({
      left: parent.value,
      right: leaf.value,
    });

    parent.addLeft(parentArcLeft);

    const subtree = new Node({
      left: leaf.value,
      right: oldParentVal,
    });

    subtree.addLeft(leaf);
    subtree.addRight(parentArcRight);
    parent.addRight(subtree);
  }

  insert(value) {
    const node = new Node(value);
    if (this.root === null) {
      this.root = node;
      return;
    }

    let curr = this.root;
    let parent = null;
    while (curr) {
      parent = curr;
      if (node.value <= curr.value) {
        curr = curr.left;
      }
      else if (node.value > curr.value) {
        curr = curr.right;
      }
    }

    if (node.value <= parent.value) {
      parent.addLeft(node);
    }
    else if (node.value > parent.value) {
      parent.addRight(node);
    }
  }

  traverse(node, callback) {
    if (!node) {
      return;
    }

    this.traverse(node.left, callback);
    callback(node);
    this.traverse(node.right, callback);
  }

  print() {
    this.root.print();
  }

}
