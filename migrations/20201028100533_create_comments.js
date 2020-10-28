
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
  ])
};

exports.down = function(knex, Promise) {
  
};
