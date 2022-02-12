'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reponses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.reponses.belongsTo(models.user, {
        foreignKey: {
          name: "iduser",
          allowNull: false,
        },
      });
      models.reponses.belongsTo(models.messages, {
        foreignKey: {
          name: "idmessages",
          allowNull: false,
        },
      });
    }
  }
  reponses.init({
    iduser: DataTypes.INTEGER,
    idmessages: DataTypes.INTEGER,
    reponses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reponses',
  });
  return reponses;
};