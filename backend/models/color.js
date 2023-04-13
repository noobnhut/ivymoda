'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      colors.belongsTo(models.Products, { foreignKey: 'id_product' });
      colors.hasMany(models.Imgs, { foreignKey: 'id_color' });
      colors.hasMany(models.size, { foreignKey: 'id_color' });
    }
  }
  colors.init({
    id_product: DataTypes.INTEGER,
    color: DataTypes.STRING,
    color_code: DataTypes.STRING,
    detail_product: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'colors',
  });
  return colors;
};