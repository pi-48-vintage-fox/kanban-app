'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        "title": "Live code 1",
        "tag": "senin week end libur dulu bentar",
        "CategoryId": 1,
        "UserId": 5,
        "createdAt": "2020-11-09T09:15:28.634Z",
        "updatedAt": "2020-11-09T09:15:28.634Z"
      }, {
        "title": "Live code 2",
        "tag": "selasa week end libur dulu bentar",
        "CategoryId": 2,
        "UserId": 5,
        "createdAt": "2020-11-09T09:15:28.634Z",
        "updatedAt": "2020-11-09T09:15:28.634Z"
      },
      {
        "title": "Live code 3",
        "tag": "rabu week end libur dulu bentar",
        "CategoryId": 3,
        "UserId": 5,
        "createdAt": "2020-11-09T09:15:28.634Z",
        "updatedAt": "2020-11-09T09:15:28.634Z"
      }, {
        "title": "Live code 3",
        "tag": "kamis week end libur dulu bentar",
        "CategoryId": 4,
        "UserId": 5,
        "createdAt": "2020-11-09T09:15:28.634Z",
        "updatedAt": "2020-11-09T09:15:28.634Z"
      },
    ]

    return queryInterface.bulkInsert("Tasks", data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tasks", null)
  }
};
