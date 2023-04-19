'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetails.belongsTo(models.Orders, {
        foreignKey: 'order_id'
      });
      OrderDetails.belongsTo(models.Products, {
        foreignKey: 'id_product'
      });
    }
  }
  OrderDetails.init({
    order_id: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('Đã đặt', 'Đang giao', 'Đã giao'),
      defaultValue: 'Đã đặt'
    }
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};