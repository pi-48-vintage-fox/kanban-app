'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let date = new Date()
    let data = [
      {
      name: 'Backlog',
      createdAt:date,
      updatedAt:date
    },
    {
      name: 'Todo',
      createdAt:date,
      updatedAt:date
    },
    {
      name: 'Doing',
      createdAt:date,
      updatedAt:date
    },
    {
      name: 'Done',
      createdAt:date,
      updatedAt:date
    },
  ]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Categories', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null)
  }
};
