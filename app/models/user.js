'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.belongsTo(models.Departement);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
      allowNull: false
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false },
    contact: { type: DataTypes.STRING }
    // poste: { type: DataTypes.STRING }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};