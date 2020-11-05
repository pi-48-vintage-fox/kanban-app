'use strict';

let taskTags = [
  {
    name: "Makan",
    color: "primary",
    TaskId: 1,
    createdAt: new Date(),
    updatedAt: new Date()    
  },
  {
    name: "Makan juga",
    color: "warning",
    TaskId: 2,
    createdAt: new Date(),
    updatedAt: new Date()    
  },
  {
    name: "Makan Lagi",
    color: "success",
    TaskId: 3,
    createdAt: new Date(),
    updatedAt: new Date()    
  },
  {
    name: "Makan Mulu",
    color: "danger",
    TaskId: 4,
    createdAt: new Date(),
    updatedAt: new Date()    
  },
]
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
   await queryInterface.bulkInsert("TaskTags",taskTags)    

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
