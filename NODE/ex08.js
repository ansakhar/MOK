const print = (str, taskTime) => {
  setTimeout(function() {
    console.log(`${str} finished!`)
  }, taskTime)
}

const execute = (str, taskTime, callback)  => {  
  callback(str, taskTime)
}

console.log("Task1 to execution...")
execute('Task1', 2000, print)

console.log("Task2 to execution...")
execute('Task2', 2000, print)

console.log("Task3 to execution...")
execute('Task3', 500, print)

console.log("Last code line executed!")