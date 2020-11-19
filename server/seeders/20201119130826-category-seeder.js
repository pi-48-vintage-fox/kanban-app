'use strict';

const data = [
  {
    name: 'Backlog',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Product',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Development',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Done',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
