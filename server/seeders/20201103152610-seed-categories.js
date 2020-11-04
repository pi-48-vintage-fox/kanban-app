'use strict';

const categories = [
  {
    name: 'Backlog',
    OrganizationId: 1
  },
  {
    name: 'Todo',
    OrganizationId: 1
  },
  {
    name: 'Doing',
    OrganizationId: 1
  },
  {
    name: 'Done',
    OrganizationId: 1
  },
  {
    name: 'Backlog',
    OrganizationId: 2
  },
  {
    name: 'Todo',
    OrganizationId: 2
  },
  {
    name: 'Doing',
    OrganizationId: 2
  },
  {
    name: 'Done',
    OrganizationId: 2
  },
  {
    name: 'Backlog',
    OrganizationId: 3
  },
  {
    name: 'Todo',
    OrganizationId: 3
  },
  {
    name: 'Doing',
    OrganizationId: 3
  },
  {
    name: 'Done',
    OrganizationId: 3
  },
]

categories.forEach(cat => {
  cat.createdAt = new Date()
  cat.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

   await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {})
  }
};
