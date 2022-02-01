'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      models.messages.belongsTo(models.user, {
        foreignKey: {
          name: "iduser",
          allowNull: false,
        },
      });
      models.messages.hasMany(models.reponses, {
        foreignKey: {
          name: "idmessages",
          allowNull: false,
        },
      });
    }
  }
  Messages.init(
    {
      title: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      content: dataTypes.TEXT,
      image: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "messages",
    }
  );
  return Messages;
};
