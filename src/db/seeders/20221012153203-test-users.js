'use strict';
const bcrypt = require('bcrypt')

function generateTEstUsers(){
  const users = [];
  for(let i = 0; i<100; i++){
    users.push({
      firstName: `Test${i}`,
      lastName: `Surname${i}`,
      email: `test${i}@gmail.com`,
      login: `login${i}`,
      age: `${i}`,
      passwordHash: bcrypt.hashSync(`admin${i}`, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  return users;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", generateTEstUsers(), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
