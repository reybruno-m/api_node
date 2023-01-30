module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define("user_roles", {
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
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

    return UserRole;
};