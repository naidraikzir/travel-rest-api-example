'use strict'

require('dotenv').config()

const server = require('./server')
require('./routes')(server)

server.start((err) => {
  if (err) throw err
  console.log('Server running at:', server.info.uri)
})
