module.exports = (sequelize, DataTypes) =>
    sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        avenue: DataTypes.STRING
    },
    {
      initialAutoIncrement: 1000,
    })
    //vivek2_2