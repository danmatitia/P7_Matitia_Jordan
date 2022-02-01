const { Model } = require("sequelize");
module.exports = (sequelize, dataTypes) => {
  class Reponses extends Model {
    static associate(models) {
      models.reponses.belongsTo(models.user, {
        foreignKey: {
          name: "idUser",
          allowNull: false,
        },
      });
      models.Reponses.belongsTo(models.messages, {
        foreignKey: {
          name: "idMessages",
          allowNull: false,
        },
      });
    }
  }
  Reponses.init(
    {
      idUser: dataTypes.INTEGER,
      idMessages: dataTypes.INTEGER,
      reponses: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Reponses;
};