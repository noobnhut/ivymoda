'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follows.belongsTo(models.users, { foreignKey: 'id_user',as: 'users' });
      Follows.belongsTo(models.Products, { foreignKey: 'id_product',as: 'Products' });
    }
  }
  Follows.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    status_seen:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Follows',
  });
  return Follows;
};