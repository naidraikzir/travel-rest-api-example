const routes = require('../utils/list-all')()

module.exports = (server) => {
  /**
   * @apiDefine token
   * Resource is only available to user with token
   */

  // add all file based routes in routes dir
  for (let route of routes) {
    require(`./${route}`)(server)
  }
}
