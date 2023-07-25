module.exports = (sequelize, DataTypes) =>
    sequelize.define('Config', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        value: DataTypes.STRING
    })