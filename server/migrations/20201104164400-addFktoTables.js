'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Users', 'OrganizationId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Organizations",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    await queryInterface.addColumn('Tasks', 'OrganizationId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Organizations",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    await queryInterface.addColumn('Tasks', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    await queryInterface.addColumn('Tasks', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    await queryInterface.addColumn('TaskTags', 'TaskId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Tasks",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })

    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
