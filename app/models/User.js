module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        firstName: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        email: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt',
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt',
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        }
    });

    return User;
};
