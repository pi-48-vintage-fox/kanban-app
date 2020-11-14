'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('UserOrganizationTasks', {
      fields: ['OrganizationId'],
      type: 'foreign key',
      name: 'OrganizationId_fkey',
      references: { //Required field
        table: 'Organizations',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint("UserOrganizationTasks", "OrganizationId_fkey")
  }
};
