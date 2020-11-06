'use strict';
const date = new Date()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
         name: 'backlog',
         color: 'red',
         order: 1,
         createdAt : date,
         updatedAt: date
        },
        {
          name: 'todo',
         color: 'orange',
         order: 2,
         createdAt : date,
         updatedAt: date
        },
        {
          name: 'doing',
         color: 'green',
         order: 3,
         createdAt : date,
         updatedAt: date
        },
        {
          name: 'done',
         color: 'blue',
         order: 4,
         createdAt : date,
         updatedAt: date
        },
      ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
