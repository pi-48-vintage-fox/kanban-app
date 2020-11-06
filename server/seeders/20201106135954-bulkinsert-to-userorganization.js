'use strict';
const data = require('<DATA SOURCE>')

data.forEach(element => {
  element.createdAt = new Date();
  element.updatedAt = new Date();
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("UserOrganizations", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserOrganizations", null, {})
  }
};
