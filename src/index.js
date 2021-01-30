


function relativeToAbsolute (relativeChord) {

  return relativeChord.slice(0,-1).reduce(
    (a, x) => {
      const last = a[a.length - 1]
      // ... array spread
      return [...a, last + x]
    },
    [0],
  )


}

// tests
const arraysEqual = (a, b) => a.join() === b.join()

// testing data
const maj = [4, 3, 4, 1]
// [0, 4, 7, 11]

const M = [4, 3, 5]
// [0, 4, 7]


console.assert(arraysEqual(relativeToAbsolute(maj), [0, 4, 7, 11]))
console.assert(arraysEqual(relativeToAbsolute(M), [0, 4, 7]))
// and of tests

// this is a mechanism specific to node js define what is accessible from a module when it's imported
/* 
const myModule = require("./modulepath")
myModule.maj // [4, 3, 4, 1]
*/
module.exports = {
  relativeToAbsolute,
  // maj: maj,
  maj, // this is equivalent to the line above (shorthand property assignment)
  M,
}