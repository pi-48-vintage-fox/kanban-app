'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [
     {
      email:'coba@mail.com',
      password:'$2b$10$0ZIDSBj63Ii./62YHew0..4UVst63slmCyRMdKn/swW/QuGt3TcMa',
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      email:'tes@mail.com',
      password:'$2b$10$0ZIDSBj63Ii./62YHew0..4UVst63slmCyRMdKn/swW/QuGt3TcMa',
      createdAt:new Date(),
      updatedAt:new Date()
     }
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
   await queryInterface.bulkInsert('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
