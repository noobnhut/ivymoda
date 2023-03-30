'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.CatSexes, { foreignKey: 'id_catsex' });
      Products.hasOne(models.ProductDetails, { foreignKey: 'id_product' });
      Products.hasMany(models.Follows, { foreignKey: 'id_product' });
      Products.hasMany(models.Carts, { foreignKey: 'id_product' });
    }
  }
  Products.init({
    id_catsex: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};