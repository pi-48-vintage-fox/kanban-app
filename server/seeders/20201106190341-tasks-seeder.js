'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let date = new Date()
    let data = [
      {
      title: 'Sudoku',
      tag: 'program',
      CategoryId: "1",
      createdAt:date,
      updatedAt:date
    },
    {
      title: 'Kanban',
      tag: 'program',
      CategoryId: 1,
      createdAt:date,
      updatedAt:date
    },
    {
      title: 'Fancy-Todo',
      tag: 'program',
      CategoryId: 1,
      createdAt:date,
      updatedAt:date
    },
    {
      title: 'Vowel',
      tag: 'program',
      CategoryId: 1,
      createdAt:date,
      updatedAt:date
    },
  ]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   title: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Tasks', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null)
  }
};
