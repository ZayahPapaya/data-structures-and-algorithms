const input = ['{}', '{}(){}', '([[stuff]]', '(){}[[]]', '{}{Code}[Fellows](())', '[({}]', '(])', '{(})', '[({)}]'];

const inputTrue = ['{}','{}(){}','(){}[[]]','{}{Code}[Fellows](())']
const inputFalse = ['([[stuff]]','[({}]', '(])', '{(})', '[({)}]']

debugBrackets = (string) => {
  let right = [];
  let left = [];
  let splitArr = string.split('');
  splitArr.forEach(character => {
    if (character === '{' || character === '(' || character === '[') {
      right.push(character)
    } else if (character === '}' || character === ')' || character === ']') {
      left.push(character)
    }
  });
  console.log('left:', left, 'right:', right)
  let left2 = [];
  left.forEach((character) => {
    if (character === ')') {
      left2.push('(') 
    } else if (character === '}') {
      left2.push('{')
    } else {
      left2.push('[')
    }
  })
  if (JSON.stringify(right) === JSON.stringify(left2)) {
    console.log('TRUE')
  } else {
    console.log('FALSE')
  }
}

console.log(inputFalse.forEach(string => {
  debugBrackets(string);
}))