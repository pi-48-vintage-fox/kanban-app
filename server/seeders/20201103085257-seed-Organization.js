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
      name: "Hacktiv8",
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      name: "Comunity Code",
      createdAt: new Date(),
      updatedAt: new Date(),
     },
   ]

   await queryInterface.bulkInsert("Organizations", data )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Organizations", null, {});
  }
};
