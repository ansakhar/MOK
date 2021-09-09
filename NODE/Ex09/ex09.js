const fs = require('fs')

fs.readFile('input.txt', (error, data) => {
    if (error) console.error(error)
    else console.log(data.toString())
 })
 
 console.log("Program ended")