const fs = require('fs')

const sum = (array) => array.reduce((result, num) => { 
    return result + parseInt(num) 
  }, 0)

console.log(sum(["1", "2"]))

const makeArray = (file) => { fs.readFile(file, (error, data) => {
    if (error) console.log(error)
    else {
      let array =  (data.toString().split(','))
      let sumArray = sum(array)
      console.log(sumArray)
    }
 })
}

makeArray('input.txt')

