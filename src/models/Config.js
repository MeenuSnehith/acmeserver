module.exports = (sequelize, DataTypes) =>
    sequelize.define('Config', {
        name: DataTypes.STRING,
        value: DataTypes.STRING
    })