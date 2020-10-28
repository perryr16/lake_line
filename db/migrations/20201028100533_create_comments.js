
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
      table.increments('id').primary()
      table.string('comment')
      table.string('creator')
      table.integer('trails_id').references('trails.id')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
