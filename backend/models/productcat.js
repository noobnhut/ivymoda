'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productcart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productcart.belongsTo(models.product, { foreignKey: 'id_product' });
    }
  }
  productcart.init({
    id_product: DataTypes.INTEGER,
    color: DataTypes.STRING,
    color_code: DataTypes.STRING,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productcart',
  });
  return productcart;
};