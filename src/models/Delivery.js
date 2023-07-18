module.exports = (sequelize, DataTypes) =>
    sequelize.define('Delivery', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        pickupCustomerName: DataTypes.STRING,
        pickupCustomerId: DataTypes.STRING,
        pickupAvn: DataTypes.STRING,
        pickupStreet: DataTypes.STRING,
        pickupTime: DataTypes.DATE,
        pickupRoute : DataTypes.STRING,
        pickupActualTime: DataTypes.DATE,

        deliveryCustomerName: DataTypes.STRING,
        deliveryCustomerId: DataTypes.STRING,
        deliveryAvn: DataTypes.STRING,
        deliveryStreet: DataTypes.STRING,
        deliveryTime: DataTypes.DATE,
        deliveryRoute : DataTypes.STRING,
        deliveryActualTime: DataTypes.DATE,
        deliveryTimeMin: DataTypes.INTEGER,

        orderTakenBy: DataTypes.STRING,
        estimatedDeliveryTime: DataTypes.DATE,
        estimatedPrice: DataTypes.INTEGER,
        estMin: DataTypes.INTEGER,
        isBonus: DataTypes.STRING,
        assignedTime: DataTypes.DATE,
        status: DataTypes.INTEGER
    },
    {
      initialAutoIncrement: 4000,
    })