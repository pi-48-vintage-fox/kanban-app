'use strict'

let tasks = [
  {
    title: 'Task 1 by Amir',
    description: 'Desc of Task 1',
    CategoryId: 1,
    UserId: 1,
    OrganizationId: 1,
  },
  {
    title: 'Task 2 by Amir',
    description: 'Desc of Task 2',
    CategoryId: 2,
    UserId: 1,
    OrganizationId: 1,
  },
  {
    title: 'Task 3 by Budi',
    description: 'Desc of Task 3',
    CategoryId: 1,
    UserId: 2,
    OrganizationId: 1,
  },
  {
    title: 'Task 4 by Budi',
    description: 'Desc of Task 4',
    CategoryId: 3,
    UserId: 2,
    OrganizationId: 1,
  },
  {
    title: 'Task 5 by Candra',
    description: 'Desc of Task 5',
    CategoryId: 2,
    UserId: 3,
    OrganizationId: 1,
  },
  {
    title: 'Task 6 by Candra',
    description: 'Desc of Task 6',
    CategoryId: 4,
    UserId: 3,
    OrganizationId: 1,
  },
  {
    title: 'Task 7 by Didi',
    description: 'Desc of Task 7',
    CategoryId: 5,
    UserId: 4,
    OrganizationId: 2,
  },
  {
    title: 'Task 8 by Didi',
    description: 'Desc of Task 8',
    CategoryId: 7,
    UserId: 4,
    OrganizationId: 2,
  },
  {
    title: 'Task 9 by Eko',
    description: 'Desc of Task 9',
    CategoryId: 8,
    UserId: 5,
    OrganizationId: 2,
  },
  {
    title: 'Task 10 by Eko',
    description: 'Desc of Task 10',
    CategoryId: 6,
    UserId: 5,
    OrganizationId: 2,
  },
]

tasks.forEach((task) => {
  task.createdAt = new Date()
  task.updatedAt = new Date()
})

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
    await queryInterface.bulkInsert('Tasks', tasks, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {})
  },
}
