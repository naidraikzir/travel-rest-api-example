const routes = require('../utils/list-all')()

module.exports = (server) => {
  // add all file based routes in routes dir
  for (let route of routes) {
    require(`./${route}`)(server)
  }
}
