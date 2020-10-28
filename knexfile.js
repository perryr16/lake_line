require('dotenv').config()

const pg = require('pg')
// pg.defaults.ssl = true

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'rossperry',
      database: 'lake_line_db',
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
}