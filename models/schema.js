const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

const { Comment } = require('./comments')
const { Trail } = require('./trails')

module.exports = { Trail, Comment }