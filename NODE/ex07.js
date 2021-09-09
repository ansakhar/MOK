const myFunctionWithCallback = (p1, p2, callback) => {
  return callback(p1, p2)
}

const myFunc = (p1, p2) => `Pizza with ${p1} and ${p2}`

const result = myFunctionWithCallback('ham', 'cheese', myFunc)

console.log(result)

const result2 = myFunc('ham', 'cheese')
console.log(result2)