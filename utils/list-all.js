const fs = require('fs')
const path = require('path')
const callsite = require('callsite')

module.exports = () => { 
  const stack = callsite()
  const caller = stack[1].getFileName()
  const name = caller.split('/').slice(-1)

  return fs.readdirSync(path.dirname(caller))
    .filter((file) => {
      return (file.indexOf('.') !== 0) && // except hidden files
        (file !== name[0]) &&             // except caller file
        (file.slice(-3) === '.js')        // only js files
    })
}
