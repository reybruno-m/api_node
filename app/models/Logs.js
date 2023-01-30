module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("logs", {
        userId: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        device: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        action: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt',
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
    });

    return Log;
};
