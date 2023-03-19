'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catsex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  catsex.init({
    id_cat: DataTypes.INTEGER,
    id_sex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'catsex',
  });
  return catsex;
};