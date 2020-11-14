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
       name: "rivari",
       email: "rivari@gmail.com",
       password: "$2b$10$zzXlpOnzUj4.c/Y/yBymI.P98hdxOFe0wiJRYX2wsTTACbqAUCoiq",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "rivari22",
       email: "rivari22@gmail.com",
       password: "$2b$10$EZpY2jaEofTm//md6uQ.NOUJf30rk/yjyho6qCdcXFnTltoZzvOYC",
       createdAt: new Date(),
       updatedAt: new Date()
     },
   ]
   await queryInterface.bulkInsert("Users", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
