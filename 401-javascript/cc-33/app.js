const leftJoin = (hashmap1, hashmap2) => {
  let output = [];
  hashmap1.forEach((value, key) =>  hashmap2.has(key) ? output.push([key, hashmap1.get(key), hashmap2.get(key)]) : output.push([key, hashmap1.get(key), null]));
  return output;
};
module.exports = {
  leftJoin
}