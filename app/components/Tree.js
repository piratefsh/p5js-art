export default class BinaryTree {
  constructor(){
    this.root = null;
  }

  insert(value){
    const node = new Node(value);
    if(this.root === null){
      this.root = node;
      return;
    }

    let curr = this.root;
    let parent = null;
    while(curr){
      parent = curr;
      if(node.value <= curr.value){
        curr = curr.left
      }
      else if(node.value > curr.value){
        curr = curr.right
      }
    }

    if(node.value <= parent.value){
      parent.addLeft(node)
    }
    else if(node.value > parent.value){
      parent.addRight(node)
    }
  }

  traverse(node, callback){
    if(!node){
      return;
    }

    this.traverse(node.left, callback);
    callback(node);
    this.traverse(node.right, callback);
  }
}

class Node {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }

  addLeft(child){
    this.left = child;
  }

  addRight(child){
    this.right = child;
  }
}