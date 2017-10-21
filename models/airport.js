'use strict'

module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    city_id: DataTypes.INTEGER
  }, {
    tableName: 'airports',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
      city () {
        if (!this.city_id || this.city_id === null) {
          throw new Error('City is required')
        }
      }
    }
  })
  return Airport
}
