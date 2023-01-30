const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env['DB_NAME'], 
    process.env['DB_USERNAME'], 
    process.env['DB_PASSWORD'], {
        host: process.env['DB_HOST'],
        dialect: process.env['DB_DIALECT'],
        define: {
            freezeTableName: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos.

db.users = require("./User.js")(sequelize, Sequelize);
db.roles = require("./Role.js")(sequelize, Sequelize);
db.userRoles = require("./UserRole.js")(sequelize, Sequelize);
db.logs = require("./Logs.js")(sequelize, Sequelize);

// Relaciones de Modelo.

db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

module.exports = db;