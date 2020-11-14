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
     title: "Bekerja",
     description: "kerja terus",
     CategoryId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      title: "Bermain Apex",
      description: "refreshing nih, maen game dulu",
      CategoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "coding",
      description: "coding lagi, lagi dan lagi",
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Group Project",
      description: "lets go work together",
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Sudoku",
      description: "sudoku solver is hard",
      CategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Battle Ship",
      description: "battleship solver is hard too",
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Phase 2",
      description: "learning Vue JS in phase 2",
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Phase 3",
      description: "learning React JS in phase 3",
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]
    await queryInterface.bulkInsert("Tasks", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
