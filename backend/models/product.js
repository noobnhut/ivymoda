'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsToMany(models.category, { through: models.catsex, foreignKey: 'id_product' });
      product.hasMany(models.productcart, { foreignKey: 'id_product' });
      product.hasMany(models.useractivity, { foreignKey: 'id_product' });
      product.hasMany(models.cart, { foreignKey: 'id_product' });
    }
  }
  product.init({
    id_cat: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    avatar: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};