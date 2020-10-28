const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')

const knexConnection = Knex(connection)

Model.knex(knexConnection)

class Trail extends Model {
  static get tableName() {
    return 'trails'
  }

  // static get relationMappings () {
  //   return {
  //     comments: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Comment,
  //       join: {
  //         from: 'trails.id',
  //         to: 'comments.trails_id'
  //       }
  //     }
  //   }
  // }
}

module.exports = { Trail }