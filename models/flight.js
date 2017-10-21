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
    validate: {
      originAndDestination () {
        if (
          (!this.origin_id && !this.destination_id) ||
          (this.city_id === null && this.destination_id === null)
        ) {
          throw new Error('Origin and Destination are required')
        }
      },
      requireDeparture () {
        if (!this.departure || this.departure === null) {
          throw new Error('Departure date is required')
        }
      }
    }
  })
  return Flight
}
