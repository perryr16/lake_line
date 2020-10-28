
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trails').del().then(() => {
    return knex('trails').insert([
      {
        name: "test trail 1", 
        summary: "a trail",
        difficulty: "wicked hard",
        lat: 10.1345,
        lon: -13.321,
        length: 3.2,
        stars: "5 stars",
        location: "leadville, CO",
        url: "url",
        imgMedium: "img",
        ascent: "1000",
        descent: "-1000",
        high: '9000',
        low: '8000',
        conditionStatus: "all good"
      },

    ])
  })
};
