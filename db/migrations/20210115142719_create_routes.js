exports.up = function (knex, Promise) {
  return knex.schema.createTable('routes', table => {
    table.increments('id').primary()
    table.string('origin')
    table.string('destination')
    table.string('clearTime')
    table.string('totalTime')
    table.string('trafficTime')
    table.string('mapUrl')
    table.string('departureTime')
    table.string('arrivalTime')
    table.string('weekDay')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('routes')
};