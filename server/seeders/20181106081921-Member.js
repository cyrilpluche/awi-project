'use strict';
const Member = require('../config/db_connection').Member;

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(Member, [{
          memberFirstname: 'Cyril',
          memberLastname: 'Pluche',
          memberPseudo: 'pluchezerrr',
          memberPassword: 'password',
          memberEmail: 'pluche.cyril@gmail.com',
          memberStatus: 1
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete(Member, null, {});
  }
};
