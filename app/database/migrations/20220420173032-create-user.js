const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: 'firstName'
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: 'lastName'
      },
      email: {
        type: DataTypes.STRING(50),
        field: 'email',
        unique: true
      },
      username: {
        type: DataTypes.STRING(30),
        field: 'username'
      },
      password: {
        type: DataTypes.STRING(100),
        field: 'password'
      },
      state: {
        type: DataTypes.BOOLEAN,
        field: 'state',
        defaultValue: 1
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
    await queryInterface.dropTable('users');
  },
};