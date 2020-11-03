'use strict';

const { User } = require('../models')

let users = [
  {
    name: 'Amir',
    username: 'amir',
    email: 'amir@mail.com',
    password: '123',
    OrganizationId: 1,
    avatarUrl: 'https://avatars.dicebear.com/api/jdenticon/amir.svg'
  },
  {
    name: 'Budi',
    username: 'budi',
    email: 'budi@mail.com',
    password: '123',
    OrganizationId: 1,
    avatarUrl: 'https://avatars.dicebear.com/api/jdenticon/budi.svg'
  },
  {
    name: 'Candra',
    username: 'candra',
    email: 'candra@mail.com',
    password: '123',
    OrganizationId: 1,
    avatarUrl: 'https://avatars.dicebear.com/api/jdenticon/candra.svg'
  },
  {
    name: 'Didi',
    username: 'didi',
    email: 'didi@mail.com',
    password: '123',
    OrganizationId: 2,
    avatarUrl: 'https://avatars.dicebear.com/api/jdenticon/didi.svg'
  },
  {
    name: 'Eko',
    username: 'eko',
    email: 'eko@mail.com',
    password: '123',
    OrganizationId: 2,
    avatarUrl: 'https://avatars.dicebear.com/api/jdenticon/eko.svg'
  },
]

users.forEach(user => {
  user.createdAt = new Date()
  user.updatedAt = new Date()
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await User.bulkCreate(users)

  },
  
  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {})
  }
};
