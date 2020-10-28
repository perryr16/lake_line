
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trails', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('description')
      table.float('lat')
      table.float('lon')
      table.float('length')
      table.string('rating')
      table.string('location')
      table.string('state')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trails')
  ])  
};
