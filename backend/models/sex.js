'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sex.belongsToMany(models.category, { through: models.catsex, foreignKey: 'id_sex' });
    }
  }
  sex.init({
    sex_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sex',
  });
  return sex;
};