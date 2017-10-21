'use strict'

module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    origin_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
    departure: DataTypes.DATE
  }, {
    tableName: 'flights',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return Flight
}
