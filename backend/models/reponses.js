'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reponses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Reponses.belongsTo(models.user, {
        foreignKey: {
          name: "iduser",
          allowNull: false,
        },
      });
      models.Reponses.belongsTo(models.Messages, {
        foreignKey: {
          name: "idmessages",
          allowNull: false,
          onDelete: "CASCADE", 
        },
      });
    }
  }
  Reponses.init({
    iduser: DataTypes.INTEGER,
    idmessages: DataTypes.INTEGER,
    reponses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reponses',
  });
  return Reponses;
};