'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.messages, {
        foreignKey: "idUser",
        onDelete: "cascade",
        hooks: true,
      });
      models.user.hasMany(models.reponses, {
        foreignKey: "idUser",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  user.init(
    {
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: "UNIQUE_EMAIL",
      },
      firstname: { type: dataTypes.STRING, allowNull: false },
      lastname: { type: dataTypes.STRING, allowNull: false },
      password: { type: dataTypes.STRING, allowNull: false },
    isAdmin: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
return user;
};