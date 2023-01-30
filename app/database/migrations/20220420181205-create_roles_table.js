const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        field: 'name'
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
    await queryInterface.dropTable('roles');
  },
};
