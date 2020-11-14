'use strict';

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
   const data = [
    {
     UserId: 1,
     TaskId: 1,
     OrganizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 1,
     TaskId: 2,
     OrganizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 1,
     TaskId: 3,
     OrganizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 1,
     TaskId: 4,
     OrganizationId: 2,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 2,
     TaskId: 5,
     OrganizationId: 2,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 2,
     TaskId: 6,
     OrganizationId: 2,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 2,
     TaskId: 7,
     OrganizationId: 2,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
     UserId: 2,
     TaskId: 8,
     OrganizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    }
    ]

    await queryInterface.bulkInsert("UserOrganizationTasks", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserOrganizationTasks", null, {});
  }
};
