const path = require("path")

if (process.argv.length < 4) {
  console.log("Usage: " + path.basename(__filename) + " RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE")
  process.exit(-1)
}

if (
  isNaN(process.argv[2]) || isNaN(process.argv[3]) || isNaN(process.argv[4]) ||
  process.argv[2] <= 0 || process.argv[3] >= process.argv[4]
) {
  console.log("Usage: " + path.basename(__filename) + " RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE")
  process.exit(-1)

}

// params is string, convert to numbers
const RANDOMIZED_NUMBERS_COUNT = Number(process.argv[2])
const MIN_VALUE = Number(process.argv[3])
const MAX_VALUE = Number(process.argv[4])

const rand_array = (numbers_count, min_val, max_val) => {
    let result = []
    for (let i = 0; i < numbers_count; i++ ) {
        result.push(Math.floor(Math.random() * (max_val - min_val + 1)) + min_val)
      } 
      return result
}


console.log(rand_array(RANDOMIZED_NUMBERS_COUNT, MIN_VALUE, MAX_VALUE))