'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDetails.belongsTo(models.Products, { foreignKey: 'id_product',as: 'Products'});
    }
  }
  ProductDetails.init({
    id_product: DataTypes.INTEGER,
    color: DataTypes.STRING,
    color_code: DataTypes.STRING,
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductDetails',
  });
  return ProductDetails;
};