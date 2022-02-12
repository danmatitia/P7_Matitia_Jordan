'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  messages.init({
    iduser: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};