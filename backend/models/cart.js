'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.belongsTo(models.user, { foreignKey: 'id_user' });
      cart.belongsTo(models.product, { foreignKey: 'id_product' });
    }
  }
  cart.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    product_qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};