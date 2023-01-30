'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_roles', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1,
        userId: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        userId: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 3,
        userId: 3,
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
