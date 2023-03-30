'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CatSexes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CatSexes.hasMany(models.Products, { foreignKey: 'id_catsex' });
      CatSexes.belongsTo(models.Categories, { foreignKey: 'id_cat' });
      CatSexes.belongsTo(models.Sexes, { foreignKey: 'id_sex' });
    }
  }
  CatSexes.init({
    id_cat: DataTypes.INTEGER,
    id_sex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CatSexes',
  });
  return CatSexes;
};