module.exports = {
  db: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    }
  },
  cors: {
    origin: [ '*' ]
  }
}
