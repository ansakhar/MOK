const numbers = [1, 2, 3, 4, 5]
const numbers_null = []

const sum = (array) => array.reduce((result, num) => { 
    return result + num 
  }, 0)

  console.log(sum(numbers))
  console.log(sum(numbers_null))