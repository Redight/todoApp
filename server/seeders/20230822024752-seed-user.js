'use strict';
const crypto = require('crypto')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, DataTypes) => {

      return queryInterface.bulkInsert('users', [{
        uuid: crypto.randomUUID(),
        firstname: 'Omar',
        lastname: 'Zoubiri',
        email: 'omarzonka@gmail.com',
        password: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
        gender: 'Male',
        role: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        uuid: crypto.randomUUID(),
        firstname: 'Mahdjouba',
        lastname: 'Dumont',
        email: 'dumont@gmail.com',
        password: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
        gender: 'Female',
        role: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        uuid: crypto.randomUUID(),
        firstname: 'Karima',
        lastname: 'Couzini',
        email: 'karima@gmail.com',
        password: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
        gender: 'Female',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        uuid: crypto.randomUUID(),
        firstname: 'Spipou7',
        lastname: 'Kamel',
        email: 'spipou7@gmail.com',
        password: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
        gender: 'Male',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
