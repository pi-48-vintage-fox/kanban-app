'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories", [{
          name: "backlog",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "todo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "doing",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "done",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Categories", null, {})  
  }
};