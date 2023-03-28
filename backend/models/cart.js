'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.belongsTo(models.users, { foreignKey: 'id_user' });
      Carts.belongsTo(models.Products, { foreignKey: 'id_product' });
    }
  }
  Carts.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    product_qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};