
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trails').del().then(() => {
    return knex('trails').insert([
      {
        name: "test trail 1", 
        description: "a trail",
        lat: 10.1345,
        lon: -13.321,
        length: 3.2,
        rating: "5 stars",
        location: "leadville",
        state: "CO",
      },
      {
        name: "test trail 2", 
        description: "an other trail",
        lat: -9.8766,
        lon: 6.8785,
        length: 1.2,
        rating: "1 thumb up",
        location: "carbondale",
        state: "CO",
      }
    ])
  })
};
