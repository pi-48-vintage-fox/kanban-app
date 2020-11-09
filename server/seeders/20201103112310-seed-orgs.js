'use strict';

const orgs = [
  {
    name: "Hacktiv8"
  },
  {
    name: "Google"
  },
  {
    name: "Facebook"
  },
]

orgs.forEach(org => {
  org.createdAt = new Date()
  org.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

   await queryInterface.bulkInsert('Organizations', orgs, {})
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Organizations', null, {})
  }
};
