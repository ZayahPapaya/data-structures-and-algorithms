'use strict';
const Handler = {};
Handler.reverseArray = (array) => {
  let stack = [];
  while(array.length > 0) {
    stack.push(array.pop());
  };
  return stack;
};

module.exports = Handler;