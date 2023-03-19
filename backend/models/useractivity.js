'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useractivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      useractivity.belongsTo(models.user, { foreignKey: 'id_user' });
      useractivity.belongsTo(models.product, { foreignKey: 'id_product' });
    }
  }
  useractivity.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'useractivity',
  });
  return useractivity;
};