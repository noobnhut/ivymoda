'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Imgs.belongsTo(models.colors, { foreignKey: 'id_color' });
    }
  }
  Imgs.init({
    id_color: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Imgs',
  });
  return Imgs;
};