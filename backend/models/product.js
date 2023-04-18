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
      Products.hasMany(models.Follows, { foreignKey: 'id_product' });
      Products.hasMany(models.colors, { foreignKey: 'id_product' });

    }
  }
  Products.init({
    id_catsex: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    information :DataTypes.STRING,
    discount: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Products',
    indexes: [{
      name: 'name_index',
      type: 'FULLTEXT',
      fields: ['name'],
    }]
  });
  return Products;
};