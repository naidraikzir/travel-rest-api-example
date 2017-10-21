'use strict'

const path = require('path')
const Sequelize = require('sequelize')
const models = require('../utils/list-all')()
const config = require('../config')
const db = {}

let sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)

models
  .map((file) => {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

/**
 * Associations
 */
db.Airport.belongsTo(db.City, {
  foreignKey: 'city_id'
})
db.Flight.belongsTo(db.Airport, {
  as: 'origin',
  foreignKey: 'origin_id'
})
db.Flight.belongsTo(db.Airport, {
  as: 'destination',
  foreignKey: 'destination_id'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
