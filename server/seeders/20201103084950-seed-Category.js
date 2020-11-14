'use strict';

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
      const data = [
        {
          name: "Backlog",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Work in Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Review",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Finished",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]

      await queryInterface.bulkInsert("Categories", data )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
