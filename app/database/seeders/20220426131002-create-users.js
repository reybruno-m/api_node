'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {

    const salt = await bcrypt.genSalt(10);

    return queryInterface.bulkInsert('users', [
      {
        firstName: "Usuario",
        lastName: "",
        username: "user",
        password: await bcrypt.hash('12345', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Moderador",
        lastName: "",
        username: "moderator",
        password: await bcrypt.hash('12345', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Administrador",
        lastName: "",
        username: "admin",
        password: await bcrypt.hash('12345', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
