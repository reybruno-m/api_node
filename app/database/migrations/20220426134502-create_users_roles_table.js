const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_roles', {
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId'
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: 'roleId'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP'),
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
  },
};