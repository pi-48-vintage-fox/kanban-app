'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: "Backlog",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Todo",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Doing",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Done",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('Categories', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null)
  }
};
