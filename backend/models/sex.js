'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sexes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sexes.hasMany(models.CatSexes, { foreignKey: 'id_sex'});
    }
  }
  Sexes.init({
    Sexes_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sexes',
  });
  return Sexes;
};