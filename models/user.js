'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return User
}
