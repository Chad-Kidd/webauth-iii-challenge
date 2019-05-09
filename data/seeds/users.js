
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'batman', password:"catwoman"},
        {id: 2, username: 'penguin', password:"umbrella"},
        {id: 3, username: 'catwoman', password:"hell here"}
      ]);
    });
};
