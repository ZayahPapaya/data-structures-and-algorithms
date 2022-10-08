function mergeSort(array) {
  let half = Math.floor(array.length / 2);
  if (array.length <= 1) {
    return array;
  }
  return merge(mergeSort(array.slice(0, half)), mergeSort(array.slice(half)));
}

function merge(left, right) {
  let array = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      array.push(left.shift());
    } else {
      array.push(right.shift())
    }
  }
  return [...array, ...left, ...right]
}
module.exports = {
  mergeSort,
}