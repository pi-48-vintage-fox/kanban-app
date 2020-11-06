'use strict';
const { makeHash } = require("../helpers/hash");

let users = [
  {
    email : "test1@email.com",
    password : makeHash("qweqwe"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email : "test2@email.com",
    password : makeHash("qweqwe"),
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
   await queryInterface.bulkInsert("Users",users)    

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
