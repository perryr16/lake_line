
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trails', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('summary')
      table.string('difficulty')
      table.string('url')
      table.string('imgMedium')
      table.float('lat')
      table.float('lon')
      table.float('length')
      table.string('stars')
      table.string('location')
      table.string('ascent')
      table.string('descent')
      table.string('high')
      table.string('low')
      table.string('conditionStatus')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trails') 
};
