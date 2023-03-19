'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.belongsToMany(models.sex, { through: 'catsex', foreignKey: 'id_cat' });
      category.hasMany(models.product, { foreignKey: 'id_cat' });
    }
  }
  category.init({
    cat_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};