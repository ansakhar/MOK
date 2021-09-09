const info = (...params) => {
  console.log(...params)
}

const log = (...params) => {
    console.log(...params)
  }
  
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    log, error, info
  }