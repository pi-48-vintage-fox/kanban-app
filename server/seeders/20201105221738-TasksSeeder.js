'use strict';

let tasks = [
  {
    title : "Bikin Sarapan",
    descriptions : "GATAU DEH",
    OrganizationId : 1,
    CategoryId : 1,
    UserId : 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title : "Bikin Makan siang",
    descriptions : "GATAU DEH",
    OrganizationId : 1,
    CategoryId : 2,
    UserId : 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title : "Bikin Makan Malam",
    descriptions : "GATAU DEH",
    OrganizationId : 1,
    CategoryId : 3,
    UserId : 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title : "Bikin Makan tengah malam",
    descriptions : "GATAU DEH",
    OrganizationId : 1,
    CategoryId : 4,
    UserId : 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
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
   await queryInterface.bulkInsert("Tasks",tasks)

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
