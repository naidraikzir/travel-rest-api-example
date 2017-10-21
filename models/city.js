'use strict'

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING
  }, {
    tableName: 'cities',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return City
}
