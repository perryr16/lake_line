// const Knex = require('knex')
// const connection = require('../knexfile')
// const { Model } = require('objection')

// const knexConnection = Knex(connection)

// Model.knex(knexConnection)

// class Comment extends Model {
//   static get tableName() {
//     return 'comments'
//   }

//   static get relationMappings() {
//     return {
//       trail: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: Trail,
//         join: {
//           from: 'comments.trails_id',
//           to: 'trails.id'
//         }
//       }
//     }
//   }
// }

// module.exports = {Comment}