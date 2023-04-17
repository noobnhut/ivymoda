'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      users.hasMany(models.Follows, { foreignKey: 'id_user', as: 'follows'});
      users.hasMany(models.Orders, { foreignKey: 'id_user', as: 'orders'});
     }
  }
  users.init({
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerId: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};