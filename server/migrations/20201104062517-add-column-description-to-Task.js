'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      
      await queryInterface.addColumn('Tasks', 'description', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Tasks', 'description', Sequelize.STRING)

  }
};
