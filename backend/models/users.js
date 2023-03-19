'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.useractivity, { foreignKey: 'id_user' });
      user.hasMany(models.cart, { foreignKey: 'id_user' });
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    url_avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};